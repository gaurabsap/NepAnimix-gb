import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdvanceCard from "./card/AdvanceCard";
const Genre = () => {
  const { id } = useParams();
  console.log(id);
  const [anime, setAnime] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const CallApi = async () => {
      setLoad(true);
      const resq = await axios.get(
        `https://api.consumet.org/meta/anilist/advanced-search?genres=["${id}"]`
      );
      console.log(resq);
      setAnime(resq.data.results);
      setLoad(false);
    };
    CallApi();
  }, [id]);
  return (
    <div className="mt-24 flex gap-5 flex-col">
      <h1 className="text-2xl text-red-500 p-4 text-center">Genre : {id}</h1>
      <AdvanceCard data={anime} load={load} />
    </div>
  );
};

export default Genre;
