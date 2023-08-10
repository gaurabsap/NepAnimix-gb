import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AnimeContext = createContext();

export const AnimeVideo = ({ children }) => {
  const [id, setId] = useState();
  const [load, setLoad] = useState(false);
  const [images, setImages] = useState("");
  const [video, setVideo] = useState([]);
  //   console.log(images);
  useEffect(() => {
    const CallApi = async () => {
      try {
        setLoad(true);
        const resq = await axios.get(
          `https://api.consumet.org/anime/gogoanime/watch${id}`
        );
        setVideo([resq.data]);
        setLoad(false);
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
        load,
        setLoad,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
