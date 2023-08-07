import React from "react";

const Skeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="flex flex-wrap md:justify-center gap-5 w-full">
        {arr.map((dat) => {
          return (
            <div className="lg:w-[18%] w-[48%] md:w-[30%] md:h-[450px] h-[300px] flex flex-col gap-1 p-2 overflow-hidden animate-pulse">
              <div className="w-full bg-gray-900 h-[60%] rounded-lg"></div>
              <div className="bg-blue-900 radius w-full h-[30%] "></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Skeleton;
