import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const useLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <AppContext.Provider
      value={{
        isLogin,
        useLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalCotext = () => {
  return useContext(AppContext);
};
