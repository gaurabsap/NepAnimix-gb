import axios from "axios";

const BASE_URL = "https://api.consumet.org/meta/anilist/advanced-search";

export const FetchData = async (query) => {
  // console.log(`${BASE_URL}?${query}`);
  const resq = axios.get(`${BASE_URL}?${query}`);
  return resq;
};
