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
import LoadingBar from "react-top-loading-bar";
import Pusher from "pusher-js";

function App({ socket }) {
  const navigate = useNavigate();

  const pusher = new Pusher("1904b460da23661d8163", {
    cluster: "ap2",
  });

  const channel = pusher.subscribe("hacktech");

  const {
    isLogin,
    useLogin,
    setAllCatagories,
    notifi_dropdown_props,
    setNotifi_dropdown_props,
    setSelectedCatagory,
    progress,
    setProgress,
    newMessNo,
    setNewMessNo
  } = useGlobalCotext();
  const navigat = useNavigate();
  // const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {

    channel.bind("new-message", function (data) {
      // setNotifi_dropdown_props(data);

      const id = JSON.parse(localStorage.getItem("user"))._id;
      if (id === data.notificationto) {
        setNewMessNo(prev => prev + 1);
      }
    });
  }, [newMessNo])

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
      `${import.meta.env.VITE_BACKEND_URL
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

  const handleChatClick = (e) => {
    e.preventDefault();
    navigate("/chat");
  };

  const handleMobileHomeClick = () => {
    setSelectedCatagory("all");
    navigat("/");
  };

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
            <section className="shadow-md md:pb-2 mb-8">
              <LoadingBar
                color="#db3b39"
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
              />
              <ToastContainer />
              <SoldtowhoPopup />
              <NotiDropDown items={notifi_dropdown_props} />
              <ProfileDropDown socket={socket} />
              <Header user={isLogin} socket={socket} />
              <Navbar />
            </section>
            <div
              id="detail"
              className={`${location.pathname === "/chat" || "/chat/:id"
                ? "w-full"
                : "w-11/12 m-auto pb-12"
                }`}
            >
              <Outlet />
            </div>
            {
              location.pathname.includes("/chat/") ? (" ") : (<div>
                <div className="flex  md:hidden fixed bg-white border-t-2 shadow-xl items-center bottom-0 z-50 w-full h-24 align-middle justify-between px-6">
                  <button onClick={handleMobileHomeClick}>
                    <img src="/assets/mobile-footer/home.svg" alt="" />
                  </button>
                  <Link to="/createnewlisting">
                    <img src="/assets/mobile-footer/Group 37787.svg" alt="" />
                  </Link>
                  <Link to="/likedproduct">
                    <img src="/assets/mobile-footer/Group 37791.svg" alt="" />
                  </Link>
                  <button onClick={handleChatClick} className="relative">
                    <p className="absolute bg-[#db3b39] p-0.5 rounded-full text-white w-5 h-5 flex align-middle justify-center items-center -top-4 left-10">{newMessNo}</p>
                    <img src="/assets/mobile-footer/Group 80.svg" alt="" />
                  </button>
                  {/* <Link to="/cart">
                    <img src="/assets/mobile-footer/Group 37789.svg" alt="" />
                  </Link> */}
                </div>
              </div>)
            }
            {location.pathname.includes("/chat") ? "" : <Footer />}
          </>
        )}
      </div>
    </>
  );
}

export default App;
