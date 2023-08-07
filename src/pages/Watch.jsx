import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  useEffect(() => {
    const CallApi = async () => {
      const resq = await axios.get(`https://api.enime.moe/anime/${id}`);
      console.log(resq);
    };
    CallApi();
  }, [id]);
  return (
    <div>
      <div>
        <h1>{id}</h1>
      </div>
    </div>
  );
};

export default Watch;
