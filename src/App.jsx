import LandingPage from "./Pages/LandingPage/LandingPage";
import "./App.css";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalCotext } from "./Context/Context";
import Footer from "./Components/Footer/Footer";
import CreateAccountPopup from "./Components/Popups/CreateAccountPopup";
import LoginPopup from "./Components/Popups/LoginPopup";
import SoldtowhoPopup from "./Components/Popups/SoldtowhoPopup";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotiDropDown from "./Components/UI/NotiDropDown";
import ProfileDropDown from "./Components/UI/ProfileDropDown";
import { AiOutlineHome } from "react-icons/ai";

function App({ socket }) {
  const {
    isLogin,
    isNotificationDropdownOpen,
    isProfileDropdownOpen,
    useLogin,
    allCatagories,
    setAllCatagories,
    setAllProducts,
    notifi_dropdown_props,
    setNotifi_dropdown_props,
    isShowMobileIcon,
  } = useGlobalCotext();
  const navigat = useNavigate();
  // const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  // const notifi_dropdown_props = [
  //   {
  //     title: "Notification",
  //     url: "",
  //   },
  // ];

  const profile_dropdown_props = [
    {
      title: "My profile",
      url: "/myprofile",
    },
    {
      title: "Information",
      url: "/information",
    },
    {
      title: "Logout",
      url: "/",
    },
  ];

  const tokenUserLogin = async () => {
    const token = localStorage.getItem("hacktechtoken");
    if (token) {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/verifytoken/tokenlogin`,
        null,
        {
          headers: {
            token: `${token}`,
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      if (res) {
        useLogin();
      }
    }
  };

  const userNotification = async () => {
    const id = JSON.parse(localStorage.getItem("user"))._id;
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/notification/allnotification/${id}`
    );
    if (res.data.allnotification.length === 0) {
      setNotifi_dropdown_props([{ title: "NO notification", url: "" }]);
    } else {
      setNotifi_dropdown_props([
        notifi_dropdown_props,
        ...res.data.allnotification,
      ]);
    }
  };

  useEffect(() => {
    tokenUserLogin();
  }, []);

  useEffect(() => {
    if (isLogin) {
      userNotification();
    }
  }, [isLogin]);

  const getAllCatagories = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/catagory/allcatagories`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    // console.log(res);
    setAllCatagories(res.data.catagories);
  };

  useEffect(() => {
    getAllCatagories();
  }, []);

  return (
    <>
      <div className="w-full">
        {!isLogin ? (
          <>
            <ToastContainer />
            <section className="shadow-md relative">
              <CreateAccountPopup socket={socket} />
              <LoginPopup socket={socket} />
              <div className="shadow-md pb-4">
                <Header />
                <Navbar />
              </div>
              {/* <LandingPage /> */}
              <div id="detail">
                <Outlet />
              </div>
              <Footer />
            </section>
          </>
        ) : (
          <>
            <section className="shadow-md md:pb-4 mb-9">
              <ToastContainer />
              <SoldtowhoPopup />
              <NotiDropDown items={notifi_dropdown_props} />
              <ProfileDropDown />
              <Header user={isLogin} socket={socket} />
              <Navbar />
              <div>
                <div className="flex  md:hidden fixed bg-white border-t-2 shadow-xl items-center bottom-0 z-50 w-full h-24 align-middle justify-between px-6">
                  <Link to="/">
                    <img src="/assets/mobile-footer/home.svg" alt="" />
                  </Link>
                  <Link to="/createnewlisting">
                    <img src="/assets/mobile-footer/Group 37787.svg" alt="" />
                  </Link>
                  <Link to="/likedproduct">
                    <img src="/assets/mobile-footer/Group 37791.svg" alt="" />
                  </Link>
                  <Link to="/chat">
                    <img src="/assets/mobile-footer/Group 80.svg" alt="" />
                  </Link>
                  {/* <Link to="/cart">
                    <img src="/assets/mobile-footer/Group 37789.svg" alt="" />
                  </Link> */}
                </div>
              </div>
            </section>
            <div
              id="detail"
              className={`${
                location.pathname === "/chat" || "/chat/:id"
                  ? "w-full"
                  : "w-11/12 m-auto"
              }`}
            >
              <Outlet />
            </div>
            {location.pathname.includes("/chat") ? "" : <Footer />}
          </>
        )}
      </div>
    </>
  );
}

export default App;
