import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyProfile from "./Pages/MyProfile/MyProfile.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import EditYourListing from "./Pages/EditYouListing/EditYourListing.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import CreateNewListing from "./Pages/CreateNewListing/CreateNewListing.jsx";
import { LikedPage } from "./Pages/LikedPage/LikedPage.jsx";
import { AppProvider } from "./Context/Context.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
