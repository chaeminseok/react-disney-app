import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "f04c23fe14e1e60ad684d3b98b72ca01",
    language: "ko-KR",
  },
});
export default instance;
