import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import bg from "../assets/bg.jpg";
import { NavLink } from "react-router-dom";
import SearchCard from "./SearchCard";

const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    const CallApi = async () => {
      try {
        setLoading(true);
        // https://api.enime.moe/popular?perPage=15
        const resq = await axios.get(
          "https://api.consumet.org/meta/anilist/popular?perPage=10&page=2"
        );
        // console.log(resq);
        setAnime(resq.data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    CallApi();
  }, []);
  return (
    <div className="w-full flex flex-col md:gap-20 gap-5 p-5 image">
      <div className="flex items-center justify-between">
        <h1 className="md:text-2xl underline underline-offset-8 ml-10 text-[15px]">
          Most popular
        </h1>
        <NavLink className="mr-10" to="/">
          View more
        </NavLink>
      </div>
      <SearchCard data={anime && anime} load={loading} justify={true} />
    </div>
  );
};

export default Popular;
