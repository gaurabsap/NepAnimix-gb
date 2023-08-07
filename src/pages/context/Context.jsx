import { createContext, useEffect, useState } from "react";
import { FetchData } from "./Api";
export const Context = createContext();

export const ContextApi = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [searchdata, setSearchData] = useState([]);
  const [query, setQuery] = useState("type=ANIME");
  // console.log(query);
  useEffect(() => {
    FetchDataFromApi(query);
  }, [query]);

  const FetchDataFromApi = async (q) => {
    try {
      setLoad(true);
      const data = await FetchData(q);
      console.log(query && query);
      // console.log(searchdata && searchdata.results);
      setSearchData(data.data);
      setLoad(false);
    } catch (error) {
      console.log(error.message);
      setLoad(false);
    }
  };

  return (
    <Context.Provider
      value={{
        searchdata,
        setQuery,
        query,
        load,
        setLoad,
      }}
    >
      {children}
    </Context.Provider>
  );
};
