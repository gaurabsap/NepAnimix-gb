import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import WatchSkeleton from "./loading/WatchSkeleton";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import {
  BiSearch,
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
  BiSolidTimeFive,
} from "react-icons/bi";
import { FaPlay } from "react-icons/fa";

import { AnimeContext, AnimeVideo } from "./context/AnimeContext";
import loading from "../assets/loading.gif";

import Video from "./Video";
import Nav from "./Nav";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Comment from "./Comment";
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
  const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    const CallApi = async () => {
      try {
        // `https://api.consumet.org/meta/anilist/info/${id}`

        const resq = await axios.get(
          `https://api.consumet.org/meta/anilist/info/${id}`
        );
        console.log(resq.data);
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
      console.log(data[0]?.episodes[0].image);
      setImages(data[0]?.episodes[0]?.image);
      setId(data[0]?.episodes[0]?.id);
      // console.log(data[0]?.episodes[0]?.sources[0].target);
      setLoad(false);
      setSelectedEp(data[0]?.episodes[0]?.id);
      // console.log(lang);
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
                <div key={i} className="w-screen flex flex-col bg-blue-800">
                  <div className="flex lg:flex-row flex-col-reverse items-center lg:gap-0 gap-2 w-full relative">
                    <div className="lg:w-[25%] h-[85vh] w-full flex flex-col gap-0 bg-blue-950 overflow-y-auto relative">
                      <div className="flex items-center justify-between w-full bg-red-600 sticky top-0 left-0 z-20">
                        <input
                          className="px-2 py-2 bg-transparent bg-blue-800  outline-0 w-full rounded-md placeholder:text-white"
                          type="text"
                          placeholder="Search episodes"
                        />
                        <BiSearch className="mr-5" size={20} />
                      </div>
                      <div
                        className={`${
                          episodes.length > 24
                            ? "flex flex-wrap gap-2 items-center w-full rounded-md bg-black"
                            : "w-full"
                        }`}
                      >
                        {episodes.length > 0 ? (
                          episodes.map((dat, i) => {
                            const { number, sources, title, image, id } = dat;
                            return (
                              <div
                                key={i}
                                onClick={() => HandleVideo(id, image)}
                                className={`mt-3 ml-2 flex items-center justify-between py-1 px-2 ${
                                  selectedep === id
                                    ? ` rounded-lg ${
                                        episodes.length > 24
                                          ? "w-fit bg-yellow-700"
                                          : "w-full bg-black py-3"
                                      }`
                                    : "bg-transparent"
                                } `}
                                // className={` `}
                              >
                                {episodes.length < 24 ? (
                                  <div className="flex items-center justify-between w-full">
                                    <p className="flex items-center gap-2 rounded-lg cursor-pointer text-[14px] w-[80%] truncate">
                                      {title !== null
                                        ? title
                                        : `Episode : ${number}`}
                                    </p>
                                    <AiFillPlayCircle size={20} />
                                  </div>
                                ) : (
                                  // <div className="">
                                  <p className="cursor-pointer w-[22px] h-[22px] flex items-center justify-center rounded-lg">
                                    {number}
                                  </p>
                                  // </div>
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
                    </div>
                    <div className="lg:flex-1 w-full h-[85vh] bg-blue-950 border border-black relative overflow-hidden">
                      <div className="flex flex-col w-full h-[90%]">
                        {load ? (
                          <div className="lg:flex-1 w-full h-full bg-blue-950 rounded-lg animate-pulse">
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
                              alt="photo"
                            />
                            {!load ? (
                              <FaPlay
                                onClick={() => {
                                  setShowVideo(true);
                                  setIsPlay(true);
                                }}
                                className="center cursor-pointer"
                                size={60}
                              />
                            ) : (
                              ""
                            )}
                            {/* <FaPlay
                              onClick={() => setShowVideo(true)}
                              className="center cursor-pointer"
                              size={50}
                            /> */}
                          </div>
                        ) : video.length > 0 ? (
                          video.map((dat) => {
                            // console.log(dat);
                            return (
                              <Video
                                play={isPlay}
                                key={dat?.sources[0]}
                                videoUrls={[
                                  {
                                    url: dat.sources[0]?.url,
                                    quality: "144px",
                                  },
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
                      <div className="lg:w-full flex justify-between items-center overflow-hidden p-3">
                        <div className="flex gap-5 items-center">
                          <h1 className="text-[18px]">Language: </h1>
                          <div className="bg-black rounded-lg overflow-hidden">
                            <button
                              className={`px-3 py-0 ${
                                lang === "Jp" ? "bg-green-600" : ""
                              }`}
                              onClick={() => setLang("Jp")}
                            >
                              Jp
                            </button>
                            <button
                              disabled={error === "nodub"}
                              className={`px-3 py-0 ${
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
        <div className="p-5">
          {data.map((dat, i) => {
            const {
              episodes,
              bannerImage,
              relations,
              slug,
              title,
              status,
              image,
              season,
              description,
              duration,
              format,
              releaseDate,
              type,
            } = dat;
            return (
              <div className="flex">
                <div className="w-[80%] flex flex-col lg:flex-row gap-5">
                  <img className="w-[200px]" src={image} alt={title.english} />
                  <div className="flex flex-col gap-5">
                    <h1>{title.english}</h1>
                    <div className="flex gap-4 items-center">
                      <p className="text-[13px] px-1 py-1 bg-red-500 rounded-md">
                        {status}
                      </p>
                      <p className="text-[13px] px-1 py-1 bg-red-500 rounded-md">
                        {season}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="flex items-center gap-1 text-[14px]">
                        <AiFillPlayCircle />
                        {type}
                      </p>
                      <p className="flex items-center gap-1 text-[14px]">
                        <BiSolidTimeFive />
                        {duration}
                      </p>
                      <p className="flex items-center gap-1 text-[14px]">
                        <BsFillCalendarDateFill />
                        {releaseDate}
                      </p>
                    </div>
                    <p className="text-gray-400">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Comment />
      </div>
    </>
  );
};

export default Watch;
