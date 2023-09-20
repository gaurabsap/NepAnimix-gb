import React, { useContext, useState } from "react";
import { AiOutlineDislike, AiOutlineDown, AiOutlineLike } from "react-icons/ai";
import { LuReply } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import { BsCaretDown } from "react-icons/bs";
import Reply from "./Reply";
import { ReactContext } from "./context/React";

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
  const { replysdata, setReplysData } = useContext(ReactContext);
  console.log(dislikes);
  const [likecolor, setLikecolor] = useState("");
  const [dislikecolor, setDisLikecolor] = useState("");
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDisLikesCount] = useState(dislikes);
  const [showreply, setShowReply] = useState(false);
  const [hidereply, setHideReply] = useState(true);
  const [reply, setReply] = useState();
  const [newReplyData, setNewReplyData] = useState([]);
  const [replydata, SetReplydata] = useState({
    AnimeId: "",
    userId: "",
    comment: "",
  });
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
  const Handleusercomment = (e) => {
    setReply(e.target.value);
    // console.log(usercomment);
    SetReplydata({
      comment: e.target.value,
      userId: "65083693a63bdab600f60186",
      AnimeId: id,
    });
  };
  console.log(replydata);
  const AddReply = async () => {
    const resq = await axios.post(
      `http://127.0.0.1:4000/api/v1/add/reply/${id}`,
      replydata
    );
    console.log(resq);
    setNewReplyData(resq.data.message.replies);
    setReplysData(resq.data.message.replies);
    setHideReply(false);
    setShowReply(false);
  };
  console.log(newReplyData);
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div className="w-[80%] flex items-start gap-3 mt-5">
          <img className="w-[45px] rounded-full" src={photo} alt={username} />
          <div className="flex flex-col gap-2 w-[100%]">
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
              <div
                onClick={() => setShowReply(!showreply)}
                className="flex flex-col relative items-center gap-1 cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <LuReply size={17} />
                  <p className="text-[14px]">Reply</p>
                </div>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <FiMoreHorizontal />
                <p className="text-[14px]">more</p>
              </div>
            </div>

            {/* {replies.length > 0
              ? replies.map((dat, i) => {
                  return <h1>{dat.username}</h1>;
                })
              : ""} */}
            {showreply ? (
              <div className="w-[70%]">
                <textarea
                  className="rounded-lg p-2 w-[100%] h-[80px] max-h-[100px] bg-slate-700 outline-0"
                  placeholder="Reply"
                  onChange={Handleusercomment}
                ></textarea>
                <div className="flex gap-3 items-end justify-end">
                  <button
                    onClick={() => setShowReply(false)}
                    className="bt py-1 px-2"
                  >
                    close
                  </button>
                  <button
                    onClick={AddReply}
                    className="bg-yellow-500 py-1 px-2 rounded-md"
                  >
                    reply
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {replies.length > 0 ? (
              <div>
                <h1
                  onClick={() => setHideReply(!hidereply)}
                  className="text-yellow-700 mt-2 flex items-center cursor-pointer"
                >
                  <AiOutlineDown />
                  Hide {replies.length} replies
                </h1>
                {!hidereply
                  ? replies.map((reply) => {
                      return (
                        <Reply
                          id={reply._id}
                          reply={reply.comment}
                          likes={reply.likes}
                          dislikes={reply.dislike}
                          username={reply.username}
                          userId={reply.userId}
                          comment={reply.comment}
                          photo={reply.photo}
                          reaply={newReplyData}
                        />
                      );
                    })
                  : ""}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
