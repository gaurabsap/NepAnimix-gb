import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Nav from "./Nav";
import SkeletonWatch from "./loading/SkeletonWatch";
import { AiOutlineArrowLeft, AiFillPlayCircle } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import {
  BsFillCalendarDateFill,
  BsPlusCircleFill,
  BsFacebook,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const Watch = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = await axios.get(`https://api.enime.moe/anime/${id}`);
        console.log(resq.data);
        setData([resq.data]);
      } catch (error) {
        console.log("xaina");
      }
    };
    CallApi();
  }, [id]);
  const Dates = (isoDate) => {
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
  return (
    <>
      <Nav />
      <div className="">
        {data.length > 0 ? (
          data.map((dat, i) => {
            const {
              bannerImage,
              countryOfOrigin,
              coverImage,
              createdAt,
              currentEpisode,
              description,
              duration,
              episodes,
              format,
              genre,
              mappings,
              next,
              season,
              slug,
              status,
              synonyms,
              title,
              updatedAt,
              year,
            } = dat;
            return (
              <>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.9), rgba(0,0,0,0.99)), url(${bannerImage})`,
                  }}
                  className="bg-cover w-screen h-screen flex lg:flex-row flex-col gap-12 lg:items-center lg:justify-between justify-center px-10 md:py-10 py-5 lg:pr-0"
                >
                  <div className="flex md:gap-10 flex-1 gap-8 justify-center">
                    <img
                      className="object-cover object-center rounded-lg w-[30%]"
                      src={coverImage}
                      alt={slug}
                    />

                    <div className="flex md:gap-10 gap-2 flex-col lg:gap-3">
                      <NavLink
                        className="flex gap-2 items-center text-red-500 text-[14px]"
                        to="/"
                      >
                        {" "}
                        <AiOutlineArrowLeft />
                        Home
                      </NavLink>
                      <div className="flex gap-4 flex-col">
                        <h1 className="text-yellow-500 font-semibold text-2xl">
                          {title.english}
                        </h1>
                        <div className="flex gap-5">
                          <p className="flex items-center gap-1 text-[14px]">
                            <AiFillPlayCircle />
                            {format}
                          </p>
                          <p className="flex items-center gap-1 text-[14px]">
                            <BiSolidTimeFive />
                            {duration}
                          </p>
                          <p className="flex items-center gap-1 text-[14px]">
                            <BsFillCalendarDateFill />
                            {year}
                          </p>
                        </div>
                        <div className="flex items-center gap-5">
                          <button className="flex items-center gap-2 bg-red-500 rounded-full px-4 py-2">
                            <AiFillPlayCircle /> Watch
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-400 text-black">
                            Add to list <BsPlusCircleFill />
                          </button>
                        </div>
                        <p className="">{description?.substr(0, 280)}...</p>
                        <div className="flex gap-5 items-center">
                          <p className="h-12 w-[2px] bg-red-500"></p>
                          <div>
                            <p className="text-red-500 text-[14px]">Share</p>
                            <p className="text-[14px]">with your friends</p>
                          </div>
                          <div className="flex gap-4 items-end text-[20px] pt-2">
                            <BsFacebook className="cursor-pointer" />
                            <BsInstagram className="cursor-pointer" />
                            <BsTwitter className="cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:h-screen md:w-full md:h-[350px] lg:w-[400px] h-[40vh] trans rounded-lg flex flex-col justify-center items-center px-4">
                    <div className="flex flex-col gap-5">
                      <h1>Native : {title.native}</h1>
                      <p>Season: {season}</p>
                      <p>Aired at: {Dates(createdAt)}</p>
                      <p>Current Ep: {currentEpisode}</p>
                      <p>Synonyms: {synonyms}</p>
                      <div className="flex flex-col gap-10">
                        <p className="w-full h-[1px] bg-white"></p>
                        <div className="flex flex-wrap items-center gap-2">
                          {genre.map((gen, i) => {
                            return (
                              <p
                                className="cursor-pointer px-2 py-1 border rounded-lg"
                                key={i}
                              >
                                {gen},{" "}
                              </p>
                            );
                          })}
                        </div>
                        <p className="w-full h-[1px] bg-white"></p>
                      </div>
                      <p>Next episodes on : {Dates(next)}</p>
                      <p>Duration: {duration}m</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <SkeletonWatch />
        )}
      </div>
      {/* <SkeletonWatch /> */}
    </>
  );
};

export default Watch;
