import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="relative min-h-screen md:flex">
      <Helmet>
        <title>Med Diagnostic|Dashboard </title>
      </Helmet>
      <div className="">
        <Sidebar></Sidebar>
      </div>

      <div className="flex-1 md:ml-64 px-5 py-5">
        {userData?.status === "blocked" ? (
          <h2 className="text-3xl font-bold text-center">
            You are Blocked, Can not see DashBoard!
          </h2>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
