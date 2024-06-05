import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";

const DashBoard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <div className="">
        <Sidebar></Sidebar>
      </div>

      <div className="flex-1 md:ml-64 px-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
