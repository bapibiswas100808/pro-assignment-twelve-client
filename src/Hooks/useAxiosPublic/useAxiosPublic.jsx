import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://pro-assignment-tweleve-server.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
