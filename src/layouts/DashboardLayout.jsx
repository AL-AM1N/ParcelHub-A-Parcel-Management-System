import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../assets/logo.png";
import {
  FaHome,
  FaBox,
  FaMoneyBill,
  FaSearch,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <Link to="/">
            <img className="w-50 h-16" src={logo} alt="ParcelHub logo" />
          </Link>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard" className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
          </li>

          <li>
            <Link to="/dashboard/myParcels" className="flex items-center gap-2">
              <FaBox /> My Parcels
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/paymentHistory"
              className="flex items-center gap-2"
            >
              <FaMoneyBill /> Payment History
            </Link>
          </li>

          <li>
            <Link to="/dashboard/track" className="flex items-center gap-2">
              <FaSearch /> Track a Package
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/updateProfile"
              className="flex items-center gap-2"
            >
              <FaUserEdit /> Update Profile
            </Link>
          </li>

          { !roleLoading && role === 'admin' &&
            <>
              <li>
                <Link
                  to="/dashboard/active-riders"
                  className="flex items-center gap-2"
                >
                  <FaUserCheck /> Active Riders
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/pending-riders"
                  className="flex items-center gap-2"
                >
                  <FaUserClock /> Pending Riders
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-2"
                >
                  <FaUserShield /> Make Admin
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
