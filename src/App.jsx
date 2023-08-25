import LandingPage from "./Pages/LandingPage/LandingPage";
import "./App.css";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useGlobalCotext } from "./Context/Context";
import Footer from "./Components/Footer/Footer";
import CreateAccountPopup from "./Components/Popups/CreateAccountPopup";
function App() {
  const { isLogin } = useGlobalCotext();

  return (
    <>
      <div>
        {!isLogin ? (
          <>
            <section className="shadow-md pb-4 relative">
              <CreateAccountPopup />
              <Header />
              <Navbar />
              <LandingPage />
            </section>
          </>
        ) : (
          <>
            <section className="shadow-md pb-4">
              <Header user={isLogin} />
              <Navbar />
            </section>
            <div id="detail" className="w-4/5 m-auto">
              <Outlet />
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;
