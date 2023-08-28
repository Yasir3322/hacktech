import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isCreateAccountPopupOpen, setIsCreateAccountPopupOpen] =
    useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const useLogin = () => {
    setIsLogin(!isLogin);
  };

  const showCreateAccountPopup = () => {
    setIsCreateAccountPopupOpen(!isCreateAccountPopupOpen);
  };
  const showLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalCotext = () => {
  return useContext(AppContext);
};
