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
  const notifi_dropdown_props = [
    {
      title: "Notification",
      url: "/notification",
    },
    {
      title: "Your liked item has been sold",
      url: "/likeditems",
    },
    {
      title: "You have unread chats",
      url: "/chat",
    },
    {
      title: "Label4",
      url: "",
    },
    {
      title: "Label5",
      url: "",
    },
  ];

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
    {
      title: "Label4",
      url: "",
    },
    {
      title: "Label5",
      url: "",
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

  useEffect(() => {
    tokenUserLogin();
  }, []);

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
              <SoldtowhoPopup />
              <LoginPopup socket={socket} />
              <Header />
              <Navbar />
              <LandingPage />
              <Footer />
            </section>
          </>
        ) : (
          <>
            <section className="shadow-md pb-4">
              <ToastContainer />
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
            {location.pathname === "/chat" ||
            location.pathname === "/chat/:id" ? (
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
