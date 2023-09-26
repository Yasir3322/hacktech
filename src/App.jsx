import LandingPage from "./Pages/LandingPage/LandingPage";
import "./App.css";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalCotext } from "./Context/Context";
import Footer from "./Components/Footer/Footer";
import CreateAccountPopup from "./Components/Popups/CreateAccountPopup";
import LoginPopup from "./Components/Popups/LoginPopup";
import SoldtowhoPopup from "./Components/Popups/SoldtowhoPopup";
import DropDown from "./Components/UI/DropDown";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ socket }) {
  const { notifi_dropdown_props, setNotifi_dropdown_props } = useGlobalCotext();

  const {
    isLogin,
    isNotificationDropdownOpen,
    isProfileDropdownOpen,
    useLogin,
    allCatagories,
    setAllCatagories,
    setAllProducts,
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
    userNotification();
  }, [notifi_dropdown_props]);

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
      <div>
        {!isLogin ? (
          <>
            <section className="shadow-md pb-4 relative">
              <CreateAccountPopup socket={socket} />
              <LoginPopup socket={socket} />
              <Header />
              <Navbar />
              {/* <LandingPage /> */}
              <div id="detail">
                <Outlet />
              </div>
              <Footer />
            </section>
          </>
        ) : (
          <>
            <section className="shadow-md pb-4">
              <ToastContainer />
              <SoldtowhoPopup />
              {isNotificationDropdownOpen ? (
                <DropDown items={notifi_dropdown_props} />
              ) : isProfileDropdownOpen ? (
                <DropDown items={profile_dropdown_props} />
              ) : (
                ""
              )}
              <Header user={isLogin} />
              <Navbar />
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
            {location.pathname === "/chat/:id" ||
            location.pathname === "/chat" ? (
              ""
            ) : (
              <Footer />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
