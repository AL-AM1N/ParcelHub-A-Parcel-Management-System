import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 🔥 Active class for NavLink
  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all ${
      isActive ? "bg-primary text-black" : "hover:bg-base-200"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navClass} end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel" className={navClass}>
          Send A Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={navClass}>
          Coverage
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/beARider" className={navClass}>
          Be a Rider
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navClass}>
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
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
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/">
          <img className="w-50 h-16" src={logo} alt="ParcelHub logo" />
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogOut} className="btn btn-primary text-black">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary text-black">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
