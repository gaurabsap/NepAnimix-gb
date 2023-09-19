import { createContext, useState } from "react";

export const authcon = createContext();

export const Auth = ({ children }) => {
  const [login, setLogin] = useState(true);

  return (
    <authcon.Provider
      value={{
        setLogin,
        login,
      }}
    >
      {children}
    </authcon.Provider>
  );
};
