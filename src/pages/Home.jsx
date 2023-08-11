import axios from "axios";
import Popular from "./Popular";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { AiFillPlayCircle, AiOutlinePlus } from "react-icons/ai";
import Nav from "./Nav";
import Recent from "./Recent";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  // console.log(data);
  const initialCharsToShow = 200;
  const titles = 32;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const ApiCall = async () => {
      const resq = await axios.get("https://api.enime.moe/popular?perPage=5");
      // console.log(resq.data.data);
      setData(resq.data.data);
    };
    ApiCall();
  }, []);
  const formatNextEpisode = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const navigate = useNavigate();
  const HandleWatch = (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <>
      <Nav />
      <div className="w-full bg-blue-950 ">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            speed={400}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            <div className="h-screen w-screen relative">
              {data &&
                data.map((dat, i) => {
                  const {
                    averageScore,
                    bannerImage,
                    coverImage,
                    countyOfOrigin,
                    currentEpisode,
                    description,
                    genre,
                    id,
                    next,
                    season,
                    slug,
                    status,
                    title,
                    synonyms,
                    year,
                    duration,
                    format,
                  } = dat;

                  return (
                    <SwiperSlide key={id}>
                      <div
                        className={`h-[80vh] flex items-center relative ${
                          dat.length < 1
                            ? (console.log("animation"),
                              "animate-pulse bg-blue-950 border-2")
                            : ""
                        }`}
                      >
                        {/* <div className=" w-full absolute z-30  h-full  "></div> */}

                        <div className="flex flex-col md:gap-5 gap-5 md:leading-6 z-50 p-5">
                          <span>#{i + 1} Spotlight</span>
                          <h1 className="lg:text-4xl text-3xl md:leading-10 md:w-[50%] w-[100%]  h-[10vh] font-bold">
                            {title.english.length > titles
                              ? title.english.slice(0, titles) + "..."
                              : title.english}
                          </h1>

                          <div className="md:flex gap-4 lg:mt-2 items-center hidden">
                            <p className="pl-1 pr-1 border rounded-sm">R</p>
                            <p className="pl-1 pr-1 bg-yellow-500 text-black rounded-sm">
                              4k
                            </p>
                            <p className="pl-1 pr-1 border rounded-sm">DUB</p>
                            <p className="pl-1 pr-1 rounded-sm border">SUB</p>
                            <p>{format}</p>
                            <p>{duration}m</p>
                          </div>
                          {/* <p className="w-[80%]">{`${description}`}</p> */}
                          <p className="md:w-[45%] hidden md:flex">
                            {expanded
                              ? description
                              : description.slice(0, initialCharsToShow) +
                                "... "}
                          </p>
                          <p>Next episode on : {formatNextEpisode(next)}</p>
                          <div className="flex items-center gap-5">
                            <button
                              onClick={() => HandleWatch(id)}
                              className="bg-slate-100 p-2 rounded-md flex items-center gap-1 text-black"
                            >
                              <AiFillPlayCircle size={20} /> Watch now
                            </button>
                            <button className="border flex items-center gap-1 p-2 rounded-md">
                              <AiOutlinePlus />
                              Add to list
                            </button>
                          </div>
                        </div>
                        <div className=" bg-red-500 border-4 border-green-700">
                          <div className="absolute w-[100%] md:w-[60%] top-0 right-0 ">
                            <img
                              className="h-screen w-full object-center object-cover"
                              src={coverImage}
                              alt={slug}
                            />
                          </div>
                          <div className="small absolute top-0 left-0 w-full h-full md:w-[15%] md:left-[32%] border-2"></div>
                        </div>
                        <div
                          className="w-screen h-[250px] absolute bottom-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 100%)",
                            zIndex: "0",
                          }}
                        ></div>
                        <div
                          className="w-screen h-[250px] absolute top-0"
                          style={{
                            background:
                              "linear-gradient(360deg, rgba(4, 21, 45, 0) 0%, #04152d 100%)",
                            // zIndex: "-1",
                          }}
                        ></div>
                        <div
                          className="w-[50%] h-full absolute left-0 top-0 effect border-1"
                          // style={{
                          //   background:
                          //     "linear-gradient(360deg, rgba(4, 21, 45, 0) 0%, #04152d 100%)",
                          // }}
                        ></div>

                        <div className="h-full w-[35%] absolute top-0 left-0 background"></div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </div>
          </Swiper>
        </div>
      </div>
      <Recent />
      <Popular />
    </>
  );
};

export default Home;
