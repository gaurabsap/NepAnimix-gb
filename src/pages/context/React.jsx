import { createContext, useState } from "react";

export const ReactContext = createContext();

export const AddReact = ({ children }) => {
  const [replysdata, setReplysData] = useState([]);

  return (
    <ReactContext.Provider
      value={{
        replysdata,
        setReplysData,
      }}
    >
      {children}
    </ReactContext.Provider>
  );
};
