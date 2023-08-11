import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AnimeContext = createContext();

export const AnimeVideo = ({ children }) => {
  const [id, setId] = useState(null);
  const [load, setLoad] = useState(false);
  const [images, setImages] = useState("");
  const [video, setVideo] = useState([]);
  const [lang, setLang] = useState("Jp");
  const [error, setError] = useState("En");
  console.log(id);
  // console.log(lang);

  useEffect(() => {
    if (lang === "En") {
      const find = id?.split("-");
      console.log(find);
      if (!find.includes("dub")) {
        const ind = find?.findIndex((dat) => dat === "episode" || dat === "ep");
        // console.log(ind);
        const val = "dub";
        const arr = [...find];
        arr.splice(ind, 0, val);
        // console.log(arr);
        const newarr = arr.join("-");
        console.log(newarr);
        setId(newarr);
      }
    }
    if (lang === "Jp") {
      const arr = id?.split("-");
      if (arr?.includes("dub")) {
        console.log("yes");
        // const ind = arr?.findIndex((dat) => dat === "dub");
        const newarr = arr.filter((dat) => dat !== "dub");
        // const newarr = [...arr];
        // console.log(newarr.join("-"));
        setId(newarr.join("-"));
      }
    }
  }, [lang]);
  useEffect(() => {
    console.log(lang);
    if (lang === "En") {
      const find = id?.split("-");
      console.log(find);
      if (!find?.includes("dub")) {
        const ind = find?.findIndex((dat) => dat === "episode" || dat === "ep");
        // console.log(ind);
        const val = "dub";
        const arr = [...find];
        arr.splice(ind, 0, val);
        // console.log(arr);
        const newarr = arr.join("-");
        console.log(newarr);
        setId(newarr);
      }
    }
  });
  // console.log(lang);
  //
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
        setError("En");
      } catch (error) {
        if (lang === "En") {
          console.log("No dub found");
          setError("nodub");
          setLang("Jp");
        }
        console.log(error.message);
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
        setLang,
        lang,
        error,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
