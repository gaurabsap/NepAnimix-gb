import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SceduleContext = createContext();

export const Scedule = ({ children }) => {
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const CallApi = async () => {
      if (filter === "All" || filter === null) {
        setLoading(true);
        const resq = await axios.get(`https://api.jikan.moe/v4/schedules`);
        setData(resq.data.data);
        setLoading(false);

        return;
      }
      setLoading(true);
      const resq = await axios.get(
        `https://api.jikan.moe/v4/schedules?filter=${filter}`
      );

      setData(resq.data.data);
      setLoading(false);
    };
    CallApi();
  }, [filter]);
  //   useEffect(() => {
  //     const CallApis = async () => {
  //       const resq = await axios.get(`https://api.jikan.moe/v4/schedules`);
  //       console.log([resq.data.data]);
  //       setData([resq.data.data]);
  //     };
  //     CallApis();
  //   }, [filter === null]);

  return (
    <SceduleContext.Provider
      value={{
        setFilter,
        data,
        loading,
      }}
    >
      {children}
    </SceduleContext.Provider>
  );
};
