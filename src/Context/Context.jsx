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
  const [userCartItems, setUserCartItems] = useState([]);
  const [userimage, setUserImage] = useState("");
  const [chatWith, setChatWith] = useState([]);
  const [show, setShow] = useState(false);

  const addChatWithUser = (user) => {
    setChatWith((prev) => {
      return [...prev, user];
    });
  };

  const setProfileImage = () => {
    setUserImage(JSON.parse(localStorage.getItem("profile")));
  };

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
        userCartItems,
        setUserCartItems,
        userimage,
        setProfileImage,
        chatWith,
        addChatWithUser,
        show,
        setShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalCotext = () => {
  return useContext(AppContext);
};
