import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useContext } from "react";
import { Scedule, SceduleContext } from "./context/Scedule";
import Skeleton from "./Skeleton";
import { BsFillPlayCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const { setFilter, data, loading } = useContext(SceduleContext);
  console.log(data);
  const scedule = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Other",
    "Unknown",
  ];
  const [select, setSelect] = useState("Sunday");
  useEffect(() => {
    setFilter(select);
  }, []);
  const ButtonClick = (filter) => {
    setSelect(filter);
    setFilter(filter);
  };
  const navigate = useNavigate();

  const AnimeDetails = (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <>
      <Nav />
      <div className="mt-28 flex flex-col">
        <div className="flex items-center mx-auto border rounded-lg bg-gray-700">
          {scedule.map((dat, i) => {
            return (
              <div className="text-center">
                <button
                  key={i}
                  onClick={() => ButtonClick(dat)}
                  className={`text-[18px]  px-6 py-1 rounded-lg ${
                    select === dat
                      ? "bg-red-600 transition-all duration-500"
                      : "transition-all duration-500"
                  } `}
                >
                  {dat}
                </button>
              </div>
            );
          })}
        </div>
        <div className={`flex flex-wrap md:justify-center md:gap-2 gap-2`}>
          {loading ? (
            <Skeleton />
          ) : data ? (
            data.map((dat, i) => {
              const {
                broadcast,
                mal_id,
                images,
                aired,
                episodes,
                id,
                status,
                title,
                season,
                genres,
                duration,
                rating,
                year,
                type,
                title_english,
                title_japanese,
              } = dat;
              return (
                <>
                  <div className="mt-10 lg:w-[18%] w-[48%] md:w-[30%] md:h-[450px] h-[280px] flex flex-col gap-1 md:p-2 overflow-hidden">
                    <div
                      className="w-full h-[60%] relative cursor-pointer img overflow-hidden"
                      onClick={() => AnimeDetails(mal_id)}
                    >
                      <img
                        className="object-cover object-center w-full h-full rounded-md image"
                        src={images.jpg.image_url}
                        alt={title_english}
                      />
                      <BsFillPlayCircleFill className="text-4xl absolute top-[50%] left-[40%] show z-20" />
                      <div className="flex gap-2 items-center absolute bottom-0 left-1 z-20">
                        <p className="md:px-3 p-2 py-1 rounded-lg md:text-[10px] text-[9px] bg-red-700">
                          {status}
                        </p>
                        {/* <p className="px-2 py-1 border rounded-lg md:text-[10px] text-[9px]">
                        {anime.format}
                      </p> */}
                        <p className="hidden md:flex px-2 py-1 border rounded-lg md:text-[10px] text-[9px]">
                          {duration}
                        </p>
                      </div>
                      <div
                        className="w-screen h-[250px] absolute bottom-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 100%)",
                          zIndex: "0",
                        }}
                      ></div>
                    </div>
                    <div className="w-full flex flex-col gap-2  md:h-[30%] p-2 bg-blue-800 radius">
                      <div>
                        <h1 className="truncate font-bold lg:text-[15px] text-[14px]">
                          {title_english || title || title_japanese}
                        </h1>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="px-2 py-1 border rounded-md md:text-[11px] text-[5px]">
                          {year}
                        </p>
                        <p className="px-2 py-1 border rounded-md md:text-[11px] text-[8px]">
                          {type}
                        </p>
                        <p className="px-3 py-1 border rounded-md md:text-[11px] text-[8px]">
                          Ep{episodes}
                        </p>
                      </div>
                      <div className="flex gap-1 text-[13px] truncate">
                        {/* {genres.slice(0, 2).map((dat) => (
                        <p className="text-yellow-500 text-[12px] md:text-[15px]">
                          {dat},{" "}
                        </p>
                      ))} */}
                        <p className="text-yellow-500 text-[12px] md:text-[15px]">
                          {/* {genres[0]}, {genres[1]} */}
                          {broadcast.string} time
                        </p>
                      </div>
                      <BsPlusCircleFill
                        title="Add to list"
                        className="cursor-pointer lg:text-3xl text-red-400 text-xl"
                      />
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </>
  );
};

export default Schedule;
