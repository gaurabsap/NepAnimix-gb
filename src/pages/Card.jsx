import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
const Card = ({ anime }) => {
  console.log(anime);
  return (
    <>
      <div className="h-[100%]">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {anime &&
            anime.slice(0, 1).map((dat) => {
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
              } = dat;
              return (
                <SwiperSlide>
                  <div
                    // style={{
                    //   backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 35%, transparent 65%), url(${coverImage})`,
                    //   backgroundPosition: "center",
                    //   backgroundSize: "cover",
                    //   // backgroundRepeat: "no-repeat",
                    // }}
                    className="flex items-center justify-center"
                  >
                    <h1>{slug}</h1>
                    <img
                      className="h-screen object-cover object-center"
                      src={bannerImage}
                      alt={slug}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* {anime &&
          anime.slice(4, 5).map((dat) => {
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
            } = dat;
            return (
              <div
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2) 35%, transparent 65%), url(${coverImage})`,
                  // backgroundPosition: "right 20%",
                  // backgroundSize: "cover",
                  // backgroundRepeat: "no-repeat",
                  // backgroundColor: "rgba(0,0,0,0.8)",
                }}
                className="h-screen w-screen border relative flex items-center justify-between bg-cover bg-right"
              >
                <div>
                  <h1>{slug}</h1>
                </div>
                <div className="h-screen w-screen">
                  <img
                    className="h-screen object-cover object-center"
                    src={bannerImage}
                    alt={slug}
                  />
                </div>
              </div>
            );
          })} */}
      </div>
    </>
  );
};

export default Card;
