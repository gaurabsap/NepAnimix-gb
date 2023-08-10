import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WatchSkeleton from "./loading/WatchSkeleton";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
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
                      {episodes?.map((dat, i) => {
                        console.log(typeof dat);
                        const { number, sources, title } = dat;
                        return (
                          <p
                            key={i}
                            className=" flex items-center gap-2 w-full p-2 bg-blue-800 rounded-lg cursor-pointer"
                          >
                            <AiFillPlayCircle /> {title}
                          </p>
                        );
                      })}
                    </div>
                    <div className="lg:flex-1 w-full h-4/5 bg-blue-950 rounded-lg"></div>
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
