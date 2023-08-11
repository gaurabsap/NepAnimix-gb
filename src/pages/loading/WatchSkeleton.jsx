const WatchSkeleton = () => {
  return (
    <div className="w-screen h-[85vh] flex flex-col  gap-2 items-start justify-start bg-blue-800 p-3">
      <div className="flex lg:flex-row flex-col-reverse items-center mt-10 gap-5 w-full h-[90vh]">
        <div className="lg:w-[25%] h-[100%] w-full bg-blue-950 rounded-lg animate-pulse"></div>
        <div className="lg:flex-1 w-full h-[100%] bg-blue-950 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default WatchSkeleton;
