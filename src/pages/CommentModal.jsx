import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { LuReply } from "react-icons/lu";
const CommentModal = ({
  comment,
  like,
  dislike,
  replies,
  username,
  id,
  AnimeId,
  photo,
}) => {
  //   console.log(datas);
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="w-[70%] flex items-start gap-3 mt-5">
          <img className="w-[45px] rounded-full" src={photo} alt={username} />
          <div className="flex flex-col gap-2">
            <h1>{username}</h1>
            <p className="text-slate-400">{comment}</p>
            <div className="flex items-center gap-5">
              <div className="cursor-pointer">
                <AiOutlineLike className="" size={17} />
              </div>
              <div className="cursor-pointer">
                <AiOutlineDislike size={17} />
              </div>
              <p className="flex items-center gap-1">
                <LuReply className="" size={17} />
                Reply
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
