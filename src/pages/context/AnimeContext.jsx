import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AnimeContext = createContext();

export const AnimeVideo = ({ children }) => {
  const [id, setId] = useState();
  const [load, setLoad] = useState();
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = axios.get(
          `https://api.consumet.org/anime/gogoanime/watch/${id}`
        );
        setVideo(resq);
      } catch (error) {
        console.log(error);
      }
    };
    CallApi();
  }, [id]);
  return (
    <AnimeContext.Provider
      value={{
        setLoad,
        setLoad,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
