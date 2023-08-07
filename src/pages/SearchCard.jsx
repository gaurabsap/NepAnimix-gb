import React from "react";
import Skeleton from "./Skeleton";
import notfound from "../assets/not.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const SearchCard = ({ data, load }) => {
  const navigate = useNavigate();
  // console.log(data);
  const AnimeDetails = (id) => {
    navigate(`/watch/${id}`);
  };
  return (
    <>
      <div className={`flex flex-wrap md:justify-center gap-2`}>
        {load ? (
          <Skeleton />
        ) : data ? (
          data.map((dat, i) => {
            const {
              slug,
              bannerImage,
              countryOfOrigin,
              coverImage,
              currentEpisode,
              duration,
              format,

              season,
              id,
              status,
              year,
              title,
            } = dat;
            return (
              <>
                <div className="lg:w-[18%] w-[48%] md:w-[30%] md:h-[450px] sm:h-[300px] flex flex-col gap-1 p-2 overflow-hidden">
                  <div
                    className="w-full h-[60%] relative cursor-pointer img overflow-hidden"
                    onClick={() => AnimeDetails(id)}
                  >
                    <img
                      className="object-cover object-center w-full h-full rounded-md image"
                      src={coverImage}
                      alt={slug}
                    />
                    <BsFillPlayCircleFill className="text-4xl absolute top-[50%] left-[40%] show z-20" />
                    <div className="flex gap-2 items-center absolute bottom-0 left-1 z-20">
                      <p className="md:px-3 p-2 py-1 rounded-lg md:text-[10px] text-[7px] bg-red-700">
                        {season}
                      </p>
                      <p className="px-2 py-1 border rounded-lg md:text-[10px] text-[7px]">
                        {format}
                      </p>
                      <p className="hidden md:flex px-2 py-1 border rounded-lg md:text-[10px] text-[7px]">
                        {duration}m
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
                  <div className="w-full flex flex-col gap-2 h-[30%] p-2 bg-blue-800 radius">
                    <div>
                      <h1 className="truncate font-bold lg:text-[15px] text-[12px]">
                        {title.english}
                      </h1>
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="px-2 py-1 border rounded-md md:text-[11px] text-[5px]">
                        {status}
                      </p>
                      <p className="px-2 py-1 border rounded-md md:text-[11px] text-[5px]">
                        {year}
                      </p>

                      <p className="hidden md:flex px-3 py-1 border rounded-md md:text-[11px] text-[5px]">
                        Ep{currentEpisode}
                      </p>
                    </div>
                    <div className="flex gap-1 text-[13px] truncate">
                      {dat.genre?.slice(0, 3).map((dat) => (
                        <p className="text-yellow-500 text-[10px] md:text-[15px]">
                          {dat},{" "}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
};

export default SearchCard;
