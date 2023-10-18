import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentModel } from "../../../backend/model/commentSchema";
import CommentModal from "./CommentModal";
// import load from "../assets/load.gif";
const Comment = ({ id }) => {
  const [data, setData] = useState([]);
  const [usercomment, setUserComment] = useState("");
  console.log(usercomment);

  console.log(data);
  useEffect(() => {
    const CallApi = async () => {
      try {
        const resq = await axios.get(
          `http://127.0.0.1:4000/api/v1/allcomment/${id}`
        );
        console.log(resq.data.data);
        setData(resq.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    CallApi();
  }, [id]);

  const [commentdata, setCommentData] = useState({
    AnimeId: "",
    userId: "",
    comment: "",
  });
  // useEffect(() => {
  //   setCommentData.comment(usercomment);
  // }, [usercomment]);
  console.log(commentdata);
  const Handleusercomment = (e) => {
    setUserComment(e.target.value);
    console.log(usercomment);
    setCommentData({
      comment: e.target.value,
      userId: "65083693a63bdab600f60186",
      AnimeId: id,
    });
  };
  const AddComment = async () => {
    // console.log(comment);
    const resq = await axios.post(
      "http://127.0.0.1:4000/api/v1/create/comment",
      commentdata
    );

    const newComment = resq.data.data;
    console.log(newComment);
    setData((prev) => [newComment, ...prev]);
    setUserComment("");
    // setData.push(newComment);
    console.log(resq);
  };
  return (
    <>
      <div className="p-4">
        <h1 className="text-gray-400 text-2xl ml-3">Comment Section.</h1>
        <div className="flex flex-col gap-5 items-start p-3">
          <textarea
            className="p-4 w-[70%] h-[100px] max-h-[180px] bg-slate-700 outline-0 rounded-lg"
            name="comment"
            value={usercomment}
            placeholder="Add your comment here..."
            onChange={Handleusercomment}
          ></textarea>
          <button
            onClick={AddComment}
            className="px-5 py-1 bg-yellow-500 rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {data.length > 0 ? (
            data.map((dat, i) => {
              const {
                comment,
                likes,
                dislike,
                replies,
                username,
                _id,
                AnimeId,
                photo,
                userId,
              } = dat;
              return (
                <>
                  {" "}
                  <CommentModal
                    id={_id}
                    photo={photo}
                    likes={likes}
                    comment={comment}
                    username={username}
                    AnimeId={AnimeId}
                    replies={replies}
                    dislikes={dislike}
                    userId={userId}

                    // datas={data}
                  />{" "}
                </>
              );
            })
          ) : (
            // <img className="w-[30px]" src={load} alt="loading" />
            <h1>No comment yet</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
