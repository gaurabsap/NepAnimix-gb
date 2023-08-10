import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WatchSkeleton from "./loading/WatchSkeleton";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { AnimeContext, AnimeVideo } from "./context/AnimeContext";
import loading from "../assets/loading.gif";
import ReactPlayer from "react-player";
const Watch = () => {
  const { setImages, images, setId, video, load, setLoad } =
    useContext(AnimeContext);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showvideo, setShowVideo] = useState(false);
  //   const [loading, setLoading] = useState(false);
  console.log(video);
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

  const HandleVideo = (id, img) => {
    // alert(img);
    setId(id);
    setImages(img);
  };
  useEffect(() => {
    setLoad(true);
    if (data.length > 0) {
      setImages(data[0]?.episodes[0]?.image);
      setId(data[0]?.episodes[0]?.sources[0].target);
      console.log(data[0]?.episodes[0]?.sources[0].target);
      setLoad(false);
    }
  }, [data]);
  return (
    <>
      <div>
        {data.length > 0 ? (
          data.map((dat, i) => {
            const { episodes, bannerImage, relations, slug, title, status } =
              dat;

            return (
              <>
                <div
                  key={i}
                  className="w-screen h-[100vh] flex flex-col  gap-2 items-end justify-center bg-blue-800"
                >
                  <div className="flex lg:flex-row flex-col-reverse items-center  gap-5 w-full h-[90vh] p-3">
                    <div className="lg:w-[25%] h-4/5 w-full flex flex-col gap-3 bg-blue-950 rounded-lg p-2 overflow-y-auto relative">
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
                          //   setImages(image);
                          console.log(episodes.length);
                          return (
                            <div
                              key={i}
                              onClick={() =>
                                HandleVideo(sources[0].target, image)
                              }
                              className="flex items-center justify-between gap-2 bg-blue-800 w-full p-2"
                            >
                              {episodes.length < 24 ? (
                                <div className="flex items-center justify-between w-full">
                                  <p className="flex items-center gap-2 rounded-lg cursor-pointer text-[14px] w-[80%] truncate">
                                    {i + 1}. {title}
                                  </p>
                                  <AiFillPlayCircle size={20} />
                                </div>
                              ) : (
                                <p>{number}</p>
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
                    <div className="lg:flex-1 w-full h-4/5 bg-blue-950 rounded-lg relative overflow-hidden">
                      {load ? (
                        <div className="lg:flex-1 w-full h-full bg-blue-950 rounded-lg animate-pulse relative">
                          <img
                            className="center w-[8%]"
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
                          {/* {!load && !showvideo ? (
                            <FaPlay
                              onClick={() => setShowVideo(true)}
                              className="center cursor-pointer"
                              size={50}
                            />
                          ) : (
                            ""
                          )} */}
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
                            <ReactPlayer
                              url={dat?.sources[4]?.url}
                              controls
                              width="100%"
                              height="100%"
                            />
                            //   <h1>hi</h1>
                          );
                        })
                      ) : (
                        <div className="lg:flex-1 w-full h-full bg-blue-950 rounded-lg animate-pulse"></div>
                      )}
                    </div>

                    {/* {video
                        ? video.map((dat) => {
                            // console.log(dat);
                            return (
                              <ReactPlayer
                                url={dat?.sources[4]?.url}
                                controls
                              />
                              //   <h1>hi</h1>
                            );
                          })
                        : ""} */}
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
