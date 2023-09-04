import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isCreateAccountPopupOpen, setIsCreateAccountPopupOpen] =
    useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSoldPopupOpen, setIsSoldPopupOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [allCatagories, setAllCatagories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const useLogin = () => {
    setIsLogin(!isLogin);
  };

  const showCreateAccountPopup = () => {
    setIsCreateAccountPopupOpen(!isCreateAccountPopupOpen);
  };
  const showLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const showSoldPopup = () => {
    setIsSoldPopupOpen(!isSoldPopupOpen);
  };

  const showNotiDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const showProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <AppContext.Provider
      value={{
        isLogin,
        useLogin,
        isCreateAccountPopupOpen,
        showCreateAccountPopup,
        isLoginPopupOpen,
        showLoginPopup,
        isSoldPopupOpen,
        showSoldPopup,
        isNotificationDropdownOpen,
        showNotiDropdown,
        isProfileDropdownOpen,
        showProfileDropdown,
        allCatagories,
        setAllCatagories,
        allProducts,
        setAllProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalCotext = () => {
  return useContext(AppContext);
};
