import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import UseAdmin from "../../Hooks/UseAdmin/UseAdmin";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allTest">All Test</NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink to="/dashBoard/stats">DashBoard</NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink to="/dashBoard/myProfile">DashBoard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-[#00BCD4]">
      <div className="navbar max-w-[1170px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue rounded-box w-52 text-white"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-xl">
            <img className="h-14" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex gap-3">
              <img
                className="h-14 w-14 rounded-full"
                src={user.photoURL}
                alt=""
              />
              <button onClick={logOut} className="project-btn">
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="project-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
