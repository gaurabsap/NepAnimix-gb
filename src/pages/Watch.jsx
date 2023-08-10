import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WatchSkeleton from "./loading/WatchSkeleton";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
const Watch = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = await axios.get(`https://api.enime.moe/anime/${id}`);
        // console.log(resq.data);
        setData([resq.data]);
      } catch (error) {
        console.log("xaina");
      }
    };
    CallApi();
  }, [id]);
  const HandleVideo = (id) => {
    alert(id);
  };
  return (
    <>
      <div>
        {data.length > 0 ? (
          data.map((dat, i) => {
            const {
              episodes,
              image,
              bannerImage,
              relations,
              slug,
              title,
              status,
            } = dat;
            console.log(episodes);
            return (
              <>
                <div
                  key={i}
                  className="w-screen h-[100vh] flex flex-col  gap-2 items-end justify-center bg-blue-800"
                >
                  <div className="flex lg:flex-row flex-col-reverse items-center  gap-5 w-full h-[90vh] p-3">
                    <div className="lg:w-[25%] h-4/5 w-full flex flex-col gap-3 bg-blue-950 rounded-lg p-2 overflow-y-auto">
                      <div className="flex items-center justify-between relative">
                        {/* <h1>List of episodes : </h1> */}
                        <input
                          className="px-5 py-1 bg-transparent bg-blue-800  outline-0 w-full rounded-md"
                          type="text"
                          placeholder="Search episodes"
                        />
                        <BiSearch className="" />
                      </div>
                      {episodes.length > 0 ? (
                        episodes.map((dat, i) => {
                          console.log(typeof dat);
                          const { number, sources, title } = dat;
                          return (
                            <div
                              key={i}
                              onClick={() => HandleVideo(sources[0].target)}
                              className="flex items-center justify-between gap-2 bg-blue-800 w-full p-2"
                            >
                              <p className="flex items-center gap-2 rounded-lg cursor-pointer text-[14px] w-[80%] truncate">
                                {i + 1}. {title}
                              </p>
                              <AiFillPlayCircle size={20} />
                            </div>
                          );
                        })
                      ) : (
                        <h1 className="text-center my-auto">
                          No episodes found
                        </h1>
                      )}
                    </div>
                    <div className="lg:flex-1 w-full h-4/5 bg-blue-950 rounded-lg">
                      {/* {episodes?.map((dat, i) => {
                         const { number, sources, title } = dat;
                        return(
                            <img src={sources} />
                        )
                      })} */}
                      <img
                        className="w-full h-full object-cover opacity-25"
                        src={episodes[0].image}
                        alt=""
                      />
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
      {/* <WatchSkeleton /> */}
    </>
  );
};

export default Watch;
