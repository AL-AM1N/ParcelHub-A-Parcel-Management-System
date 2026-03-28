import React from "react";
import { NavLink, Outlet } from "react-router";
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
  FaMotorcycle,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  // 🔥 Common class function
  const navClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-lg transition-all ${
      isActive
        ? "bg-primary text-black"
        : "hover:bg-base-300"
    }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* 🔹 Navbar (mobile) */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>

          <NavLink to="/">
            <img className="w-40 h-14" src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* 🔹 Page Content */}
        <Outlet />
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-1">
          {/* 🔹 Logo */}
          <NavLink to="/">
            <img className="w-40 h-14 mb-4" src={logo} alt="logo" />
          </NavLink>

          {/* 🔹 Common Links */}
          <li>
            <NavLink to="/dashboard" end className={navClass}>
              <FaHome /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myParcels" className={navClass}>
              <FaBox /> My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className={navClass}
            >
              <FaMoneyBill /> Payment History
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/track" className={navClass}>
              <FaSearch /> Track a Package
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className={navClass}>
              <FaUserEdit /> Profile
            </NavLink>
          </li>

          {/* 🔹 Rider Links */}
          {!roleLoading && role === "rider" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/pending-deliveries"
                  className={navClass}
                >
                  <FaTasks /> Pending Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/completed-deliveries"
                  className={navClass}
                >
                  <FaCheckCircle /> Completed Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-earnings"
                  className={navClass}
                >
                  <FaWallet /> My Earnings
                </NavLink>
              </li>
            </>
          )}

          {/* 🔹 Admin Links */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assign-rider"
                  className={navClass}
                >
                  <FaMotorcycle /> Assign Rider
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/active-riders"
                  className={navClass}
                >
                  <FaUserCheck /> Active Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pending-riders"
                  className={navClass}
                >
                  <FaUserClock /> Pending Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className={navClass}
                >
                  <FaUserShield /> Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;