import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AnimeContext = createContext();

export const AnimeVideo = ({ children }) => {
  const [id, setId] = useState();
  //   const [load, setLoad] = useState();
  const [images, setImages] = useState("");
  const [video, setVideo] = useState([]);
  //   console.log(images);
  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = await axios.get(
          `https://api.consumet.org/anime/gogoanime/watch${id}`
        );
        setVideo([resq.data]);
        console.log(resq);
      } catch (error) {
        console.log(error);
      }
    };
    CallApi();
  }, [id]);
  return (
    <AnimeContext.Provider
      value={{
        setImages,
        images,
        setId,
        video,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
