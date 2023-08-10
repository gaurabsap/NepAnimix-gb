import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

const AdWatch = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = await axios.get(
          `https://api.consumet.org/meta/mal/info/${id}`
        );
        console.log(resq.data);
        setData([resq.data]);
      } catch (error) {
        console.log("xaina");
      }
    };
    CallApi();
  }, [id]);
  return (
    <div>
      <Nav />
      <div className="">
        {data ? (
          data.map((dat, i) => {
            const {
              ageRating,
              description,
              endDate,
              createdAt,
              image,
              popularity,
              episodes,
              producers,
              genres,
              rating,
              startDate,
              season,
              slug,
              studios,
              synonyms,
              title,
              totalEpisodes,
              trailer,
            } = dat;
            return (
              <>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8), rgba(0,0,0,1)), url(${image})`,
                  }}
                  className="bg-cover bg-center w-screen h-screen bg-blue-900 flex lg:flex-row flex-col gap-10 lg:items-center lg:justify-between justify-center px-10 md:py-10 py-5"
                >
                  <div className="flex md:gap-10 gap-5">
                    <div className="flex lg:w-[300px] lg:h-[350px] md:w-[40%] md:h-[40vh] w-[450px] h-[200px] bg-blue-950">
                      <img
                        className="object-cover w-full object-center rounded-lg"
                        src={image}
                        alt={title.english}
                      />
                    </div>
                    <div className="flex md:gap-10 gap-8 flex-col  animate-pulse">
                      <div className="flex gap-5 flex-col">
                        <h1>{title}</h1>
                        <p>{description}</p>
                      </div>
                      <div className="flex gap-2 flex-col"></div>
                      <div className="lg:w-32 w-20 lg:h-10 md:h-8 h-5 bg-blue-950 rounded-lg hidden md:flex"></div>
                    </div>
                  </div>
                  <div className="lg:w-[400px] lg:h-[400px] md:w-full md:h-[350px] w-full h-[40vh] bg-blue-950 rounded-lg"></div>
                </div>
              </>
            );
          })
        ) : (
          <SkeletonWatch />
        )}
      </div>
    </div>
  );
};

export default AdWatch;
