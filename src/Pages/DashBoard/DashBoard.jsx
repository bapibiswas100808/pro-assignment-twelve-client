import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  const userLinks = (
    <>
      <li>
        <NavLink to="/dashBoard/myProfile">My Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashBoard/myApp">My Upcoming Appointments</NavLink>
      </li>
      <li>
        <NavLink to="/dashBoard/myResult">Test Results</NavLink>
      </li>
    </>
  );
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-2">
      <div className="bg-[#0d47a1] lg:w-[200px] text-white p-4">
        <ul className=" flex gap-5 lg:flex-col">{userLinks}</ul>
      </div>

      <div className=" flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
