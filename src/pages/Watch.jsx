import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import WatchSkeleton from "./loading/WatchSkeleton";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import {
  BiSearch,
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
} from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import {
  GrChapterNext,
  GrChapterPrevious,
  GrFormPreviousLink,
} from "react-icons/gr";
import { FaBackwardFast } from "react-icons/fa6";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AnimeContext, AnimeVideo } from "./context/AnimeContext";
import loading from "../assets/loading.gif";
import ReactPlayer from "react-player";
import Video from "./Video";
import Nav from "./Nav";
const Watch = () => {
  const [selectedep, setSelectedEp] = useState();
  const {
    setImages,
    images,
    setId,
    video,
    load,
    setLoad,
    setLang,
    lang,
    error,
  } = useContext(AnimeContext);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showvideo, setShowVideo] = useState(false);
  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = await axios.get(`https://api.enime.moe/anime/${id}`);
        // console.log(resq.data);
        setData([resq.data]);
      } catch (error) {
        // console.log("xaina");
      }
    };
    CallApi();
  }, [id]);

  const HandleVideo = (id, img) => {
    setId(id);
    setImages(img);
    setSelectedEp(id);
    setLang(lang);
  };
  useEffect(() => {
    setLoad(true);
    if (data.length > 0) {
      setImages(data[0]?.episodes[0]?.image);
      setId(data[0]?.episodes[0]?.sources[0].target);
      console.log(data[0]?.episodes[0]?.sources[0].target);
      setLoad(false);
      setSelectedEp(data[0]?.episodes[0]?.sources[0].target);
      console.log(lang);
    }
  }, [data]);
  return (
    <>
      <Nav />
      <div className="mt-24">
        {data.length > 0 ? (
          data.map((dat, i) => {
            const { episodes, bannerImage, relations, slug, title, status } =
              dat;

            return (
              <>
                <div key={i} className="w-screen flex flex-col bg-blue-800 ">
                  {/* <div className="px-5 py-4 w-full bg-black flex items-center gap-3">
                    <NavLink
                      className="text-red-500 flex items-center gap-2"
                      to="/"
                    >
                      <AiOutlineArrowLeft color="white" />
                      Home
                    </NavLink>
                    <h1 className="text-[15px] font-[300]">Watching {slug}</h1>
                  </div> */}
                  <div className="flex lg:flex-row flex-col-reverse items-center lg:gap-0 gap-2 w-full relative">
                    <div className="lg:w-[25%] h-[85vh] w-full flex flex-col gap-3 bg-blue-950 rounded-lg p-2 overflow-y-auto relative">
                      <div className="flex items-center justify-between w-full bg-blue-950 sticky top-0 left-0 z-20">
                        <input
                          className="px-5 py-1 bg-transparent bg-blue-800  outline-0 w-full rounded-md"
                          type="text"
                          placeholder="Search episodes"
                        />
                        <BiSearch className="" />
                      </div>
                      {episodes.length > 0 ? (
                        episodes.map((dat, i) => {
                          const { number, sources, title, image } = dat;
                          return (
                            <div
                              key={i}
                              onClick={() =>
                                HandleVideo(sources[0].target, image)
                              }
                              className={
                                selectedep === sources[0].target
<<<<<<< HEAD
                                  ? "flex flex-wrap items-center justify-between gap-2 bg-yellow-700 w-full p-2"
=======
                                  ? "flex flex-wrap items-center justify-between gap-2 bg-yellow-800 w-full p-2"
>>>>>>> 43643392df2bc909909e067c60f5e2188bc80d35
                                  : "flex flex-wrap items-center justify-between gap-2 bg-blue-800 w-full p-2"
                              }
                              // className={` `}
                            >
                              {episodes.length < 24 ? (
                                <div className="flex items-center justify-between w-full">
                                  <p className="flex items-center gap-2 rounded-lg cursor-pointer text-[14px] w-[80%] truncate">
                                    {i + 1}. {title}
                                  </p>
                                  <AiFillPlayCircle size={20} />
                                </div>
                              ) : (
                                <div className="flex flex-wrap">
                                  <p className="inline-block w-fit cursor-pointer">
                                    {number}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <h1 className="text-center my-auto">
                          No episodes found
                        </h1>
                      )}
                    </div>
                    <div className="lg:flex-1 w-full h-[85vh] bg-blue-950 rounded-lg relative overflow-hidden">
                      <div className="flex flex-col w-full h-[90%]">
                        {load ? (
                          <div className="lg:flex-1 w-full h-full bg-blue-950 rounded-lg animate-pulse relative">
                            <img
                              className="absolute top-[40%] 
                            left-[40%] w-[8%]"
                              src={loading}
                              alt="loading"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {!showvideo ? (
                          <div className="w-full h-full">
                            <img
                              className={`w-full h-full object-cover opacity-25 {video ? "hidden" : "flex"}`}
                              src={images}
                              alt=""
                            />
                            {!load ? (
                              <FaPlay
                                onClick={() => setShowVideo(true)}
                                className="center cursor-pointer"
                                size={50}
                              />
                            ) : (
                              ""
                            )}
                            <FaPlay
                              onClick={() => setShowVideo(true)}
                              className="center cursor-pointer"
                              size={50}
                            />
                          </div>
                        ) : video.length > 0 ? (
                          video.map((dat) => {
                            // console.log(dat);
                            return (
                              <Video
                                key={dat.sources[0]}
                                videoUrls={[
                                  { url: dat.sources[0].url, quality: "144px" },
                                  { url: dat.sources[1].url, quality: "360px" },
                                  { url: dat.sources[2].url, quality: "720px" },
                                  {
                                    url: dat.sources[3].url,
                                    quality: "1080px",
                                  },
                                  { url: dat.sources[4].url, quality: "Auto" },
                                ]}
                                photo={images}
                              />
                              //   <h1>hi</h1>
                            );
                          })
                        ) : (
                          <div className="lg:flex-1 w-full h-full bg-blue-950 rounded-lg animate-pulse"></div>
                        )}
                      </div>
                      <div className="lg:w-[70%] flex justify-between items-center overflow-hidden p-3">
                        <div className="flex gap-2 items-center">
                          <h1 className="text-[18px]">Lang: </h1>
                          <div className="bg-black rounded-lg overflow-hidden">
                            <button
                              className={`px-4 py-1 ${
                                lang === "Jp" ? "bg-green-600" : ""
                              }`}
                              onClick={() => setLang("Jp")}
                            >
                              Jp
                            </button>
                            <button
                              disabled={error === "nodub"}
                              className={`px-4 py-1 ${
                                lang === "En" ? "bg-green-600" : ""
                              }`}
                              onClick={() => setLang("En")}
                            >
                              {error}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mr-10">
                          <p className="flex items-center gap-2 bg-green-700 px-2 py-1 rounded-lg">
                            Prev:
                            <BiSolidSkipPreviousCircle className="cursor-pointer text-2xl" />
                          </p>
                          <p className="flex items-center gap-2 bg-green-700 px-2 py-1 rounded-lg">
                            Next:
                            <BiSolidSkipNextCircle className="cursor-pointer text-2xl" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <WatchSkeleton />
        )}
      </div>
    </>
  );
};

export default Watch;
