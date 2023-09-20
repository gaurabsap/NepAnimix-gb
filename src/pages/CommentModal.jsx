import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { LuReply } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";

const CommentModal = ({
  comment,
  likes,
  dislikes,
  replies,
  username,
  id,
  AnimeId,
  photo,
  userId,
}) => {
  console.log(dislikes);
  const [likecolor, setLikecolor] = useState("");
  const [dislikecolor, setDisLikecolor] = useState("");
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDisLikesCount] = useState(dislikes);

  const LikeButton = async () => {
    try {
      let newLikesCount = likesCount;
      let newDisLikeCount = dislikesCount;
      if (dislikecolor.length > 1) {
        setDisLikecolor("");
        newDisLikeCount -= 1;
        // newLikesCount += 1;
        setLikecolor("red");
      }
      if (likecolor === "") {
        newLikesCount += 1;
        setLikecolor("red");
      } else {
        newLikesCount -= 1;
        setLikecolor("");
      }
      setLikesCount(newLikesCount);
      setDisLikesCount(newDisLikeCount);
      console.log(newDisLikeCount);
      const resq = await axios.post(
        `http://127.0.0.1:4000/api/v1/like/${userId}/${id}/${newLikesCount}/${newDisLikeCount}`
      );
      console.log(resq);
      if (resq.data.message === "liked") {
        // console.log()
        setLikesCount(newLikesCount);
        setDisLikesCount(newDisLikeCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DisLikeButton = async () => {
    try {
      let newDislikesCount = dislikesCount;
      let newLikesCount = likesCount;
      if (likecolor.length > 0) {
        setLikecolor("");
        // setLikesCount(likesCount - 1);
        newLikesCount -= 1;
        // newDislikesCount += 1;
        setDisLikecolor("red");
      }
      if (dislikecolor === "") {
        newDislikesCount += 1;
        setDisLikecolor("red");
      } else {
        newDislikesCount -= 1;
        setDisLikecolor("");
      }
      setDisLikesCount(newDislikesCount);
      setLikesCount(newLikesCount);
      const resq = await axios.post(
        `http://127.0.0.1:4000/api/v1/like/${userId}/${id}/${newLikesCount}/${newDislikesCount}`
      );
      if (resq.data.message === "liked") {
        setDisLikesCount(newDislikesCount);
        setLikesCount(newLikesCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="w-[70%] flex items-start gap-3 mt-5">
          <img className="w-[45px] rounded-full" src={photo} alt={username} />
          <div className="flex flex-col gap-2">
            <h1>{username}</h1>
            <p className="text-slate-400">{comment}</p>
            <div className="flex items-center gap-5">
              <div
                className="cursor-pointer flex items-center gap-1"
                onClick={LikeButton}
              >
                <AiOutlineLike
                  className="overflow-hidden rounded-lg"
                  size={17}
                  color={likecolor}
                />
                <p className="text-[14px]">
                  {likesCount === 0 ? "" : likesCount}
                </p>
              </div>
              <div
                className="cursor-pointer flex items-center"
                onClick={DisLikeButton}
              >
                <AiOutlineDislike size={17} color={dislikecolor} />
                <p className="text-[14px] overflow-hidden">
                  {dislikesCount === 0 ? "" : dislikesCount}
                </p>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <LuReply className="" size={17} />
                <p className="text-[14px]">Reply</p>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <FiMoreHorizontal />
                <p className="text-[14px]">more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
