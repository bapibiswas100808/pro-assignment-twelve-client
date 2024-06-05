import { useState } from "react";
import { GrLogout } from "react-icons/gr";
// import { FcSettings } from "react-icons/fc";
import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../../src/assets/logo1.png";
import UseAdmin from "../../../Hooks/UseAdmin/UseAdmin";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [isAdmin] = UseAdmin();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-blue w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {isAdmin ? (
                <>
                  <NavLink
                    to="allUser"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsGraphUp className="w-5 h-5" />

                    <span className="mx-4 font-medium">All User</span>
                  </NavLink>

                  <NavLink
                    to="addTest"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsFingerprint className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add A Test</span>
                  </NavLink>

                  <NavLink
                    to="allTest"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <GrUserAdmin className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Tests</span>
                  </NavLink>
                  <NavLink
                    to="reserve"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <GrUserAdmin className="w-5 h-5" />

                    <span className="mx-4 font-medium">Reservation</span>
                  </NavLink>
                  <NavLink
                    to="addBanner"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsFingerprint className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add a Banner</span>
                  </NavLink>
                  {/* My Listing */}
                  <NavLink
                    to="allBanner"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <GrUserAdmin className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Banners</span>
                  </NavLink>
                  <NavLink
                    to="stats"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <GrUserAdmin className="w-5 h-5" />

                    <span className="mx-4 font-medium">Statistic</span>
                  </NavLink>
                </>
              ) : (
                <>
                  {/* my profile */}
                  <NavLink
                    to="/dashBoard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsGraphUp className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Profile</span>
                  </NavLink>

                  {/*  */}
                  <NavLink
                    to="myApp"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <BsFingerprint className="w-5 h-5" />

                    <span className="mx-4 font-medium">
                      My Upcoming Appointments
                    </span>
                  </NavLink>
                  {/* My Listing */}
                  <NavLink
                    to="myResult"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive ? "bg-[#003479]  text-white" : "text-gray-600"
                      }`
                    }
                  >
                    <GrUserAdmin className="w-5 h-5" />

                    <span className="mx-4 font-medium">Test Results</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          {/* <NavLink
            to="/dashboard/myResult"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Test Results</span>
          </NavLink> */}
          <NavLink to="/">
            <button
              // onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Back to Home</span>
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
