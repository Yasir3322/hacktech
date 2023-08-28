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
import HomePage from "./Pages/HomePage/HomePage.jsx";
import CreateNewListing from "./Pages/CreateNewListing/CreateNewListing.jsx";
import { LikedPage } from "./Pages/LikedPage/LikedPage.jsx";
import { AppProvider } from "./Context/Context.jsx";
import ProductPage from "./Pages/IndevProductPage/ProductPage.jsx";
import ChatPage from "./Pages/ChatPage/ChatPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
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
        path: "/edityourlisting",
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
        path: "/productpage",
        element: <ProductPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
