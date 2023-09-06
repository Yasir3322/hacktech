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
import { AppProvider } from "./Context/Context.jsx";
import ProductPage from "./Pages/IndevProductPage/ProductPage.jsx";
import ChatPage from "./Pages/ChatPage/ChatPage.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import { toast } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import Pusher from "pusher-js";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
        path: "/myprofile",
        element: <MyProfile />,
      },
      {
        path: "/likedproduct",
        element: <LikedPage />,
      },
      {
        path: "/productpage/:id",
        element: <ProductPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/verifyemail",
    element: <VerifyEmail />,
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
};

connectWithPusher();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ChakraProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ChakraProvider>
  </ThemeProvider>
);
