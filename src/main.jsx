import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//them provider
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyProfile from "./Pages/MyProfile/MyProfile.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import EditYourListing from "./Pages/EditYouListing/EditYourListing.jsx";
import CreateNewListing from "./Pages/CreateNewListing/CreateNewListing.jsx";
import { LikedPage } from "./Pages/LikedPage/LikedPage.jsx";
import { AppProvider, useGlobalCotext } from "./Context/Context.jsx";
import ProductPage from "./Pages/IndevProductPage/ProductPage.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import { toast } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import Pusher from "pusher-js";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail.jsx";
import Success from "./Pages/SuccessfullPage/Success.jsx";
import Failure from "./Pages/FailurePage/Failure.jsx";
import socketIO from "socket.io-client";
import ChatBar from "./Pages/ChatPage/ChatBar.jsx";
import ChatBody from "./Pages/ChatPage/ChatBody.jsx";
import ChatWelcome from "./Pages/ChatPage/ChatWelcome.jsx";
import RatingSold from "./Components/UI/RatingSold.jsx";
import ResetPassword from "./Pages/PasswordRest/RestPassword.jsx";
import emailjs from '@emailjs/browser';
import UpdatePassword from "./Pages/PasswordRest/UpdatePassword.jsx";

const socket = socketIO.connect("https://trojansquare.com");

// const { setNotifi_dropdown_props } = useGlobalCotext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    children: [
      {
        path: "/",
        element: <LandingPage socket={socket} />,
      },
      {
        path: "/user",
        element: <MyProfile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/edityourlisting/:id",
        element: <EditYourListing />,
      },
      {
        path: "/createnewlisting",
        element: <CreateNewListing />,
      },
      {
        path: "/myprofile/:id",
        element: <MyProfile />,
      },
      {
        path: "/likedproduct",
        element: <LikedPage />,
      },
      {
        path: "/productpage/:id",
        element: <ProductPage socket={socket} />,
      },
      {
        path: "/chat",
        element: <ChatBar socket={socket} />,
        children: [
          {
            path: "/chat",
            element: <ChatWelcome socket={socket} />,
          },
          {
            path: "/chat/:id",
            element: <ChatBody socket={socket} />,
          },
        ],
      },
    ],
  },
  {
    path: "/verifyemail",
    element: <VerifyEmail />,
  },
  {
    path: "/Successfull",
    element: <Success />,
  },
  {
    path: "/paymentfailure",
    element: <Failure />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/resetpassword/:id",
    element: <UpdatePassword />,
  },
]);

const connectWithPusher = () => {
  const pusher = new Pusher("1904b460da23661d8163", {
    cluster: "ap2",
  });

  const channel = pusher.subscribe("hacktech");

  channel.bind("create-product", function (data) {
    if (data) {
      toast.success("Listing Created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });

  channel.bind("new-message", function (data) {
    // setNotifi_dropdown_props(data);

    const id = JSON.parse(localStorage.getItem("user"))._id;
    if (id === data.notificationto) {
      toast.success("New message", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });
};

connectWithPusher();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <ChakraProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ChakraProvider>
  </ThemeProvider>
);
