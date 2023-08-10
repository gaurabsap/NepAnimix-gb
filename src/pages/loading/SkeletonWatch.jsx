import React from "react";

const SkeletonWatch = () => {
  return (
    <>
      <div className="w-screen h-screen bg-blue-900 flex lg:flex-row flex-col gap-10 lg:items-center lg:justify-between justify-center px-10 md:py-10 py-5">
        <div className="flex md:gap-10 gap-5">
          <div className="flex lg:w-[300px] lg:h-[350px] md:w-[40%] md:h-[40vh] w-[450px] h-[200px] bg-blue-950 rounded-lg animate-pulse"></div>
          <div className="flex md:gap-10 gap-8 flex-col  animate-pulse">
            <div className="flex gap-5 flex-col">
              <div className="lg:w-[300px] lg:h-[40px] md:w-[350px] md:h-[5vh] w-[150px] h-[4vh] rounded-lg bg-blue-950"></div>
              <div className="lg:w-[300px] lg:h-[40px] md:w-[350px] md:h-[5vh] w-[150px] h-[4vh]  rounded-lg bg-blue-950"></div>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="lg:w-[300px] lg:h-[40px] md:w-[350px] md:h-[5vh] w-[150px] h-[4vh] rounded-lg bg-blue-950"></div>
              <div className="lg:w-[300px] lg:h-[40px] md:w-[350px] md:h-[5vh] w-[150px] h-[4vh] rounded-lg bg-blue-950"></div>
            </div>
            <div className="lg:w-32 w-20 lg:h-10 md:h-8 h-5 bg-blue-950 rounded-lg hidden md:flex"></div>
          </div>
        </div>
        <div className="lg:w-[400px] lg:h-[400px] md:w-full md:h-[350px] w-full h-[40vh] bg-blue-950 rounded-lg animate-pulse"></div>
      </div>
    </>
  );
};

export default SkeletonWatch;
