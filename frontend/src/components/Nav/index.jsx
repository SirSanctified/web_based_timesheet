import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaSignOutAlt,
  FaSignInAlt,
  FaUsers,
  FaCalendarWeek,
  FaFileContract,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

import {MdDashboard} from 'react-icons/md';

const Nav = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="h-max min-h-[100vh] bg-blue-500 w-fit min-w-max py-4 px-2 rounded-r-lg overflow-scroll">
      { showNav ? (
        <FaAngleDoubleLeft
          onClick={() => setShowNav(!showNav)}
          className="text-blue-950 hover:cursor-pointer text-2xl absolute top-4 left-[37%] md:hidden transition-all transition-500"
        />
      ) : (
        <FaAngleDoubleRight
        onClick={() => setShowNav(!showNav)}
        className="text-blue-950 hover:cursor-pointer text-2xl absolute top-4 left-14 md:hidden transition-all transition-duration-500"
      />
      )}
      <aside className=" flex flex-col items-start md:items-start gap-8  justify-center md:justify-start mt-8 ">
        <h1 className="text-blue-950 font-black text-2xl flex flex-col gap-3">
          <span className="text-sm md:text-2xl text-white bg-blue-950 rounded-full py-2 px-3 w-fit">
            M.
          </span>
          <span className={ showNav ? "block" : "hidden md:block"}>Manage</span>
        </h1>
        {auth?.user ? (
          <ul className="flex flex-col items-start md:items-start justify-start md:justify-start gap-[2rem] ml-auto">
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start justify-start gap-2">
              <Link
                to={"/"}
                className="text-white mr-4 md:mr-0 text-lg md:text-3xl "
              >
                <FaHome />
              </Link>
              <Link to={"/"} className={ showNav ? "block" : "hidden md:block"}>
                Home
              </Link>
            </li>
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start gap-2">
                <Link
                  to={"/dashboard"}
                  className="text-white mr-4 md:mr-0 text-lg md:text-3xl  "
                >
                  <MdDashboard />
                </Link>
                <Link to={"/dashboard"} className={ showNav ? "block" : "hidden md:block"}>
                  Dashboard
                </Link>
              </li>
            {auth?.user.role === "admin" && (
              <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start gap-2">
                <Link
                  to={"/employees/all"}
                  className="text-white mr-4 md:mr-0 text-lg md:text-3xl  "
                >
                  <FaUsers />
                </Link>
                <Link to={"/employees/all"} className={ showNav ? "block" : "hidden md:block"}>
                  Employees
                </Link>
              </li>
            )}
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start gap-2">
              <Link
                to={"/timesheets/all"}
                className="text-white mr-4 md:mr-0 text-lg md:text-3xl "
              >
                <FaCalendarWeek />
              </Link>
              <Link to={"/timesheets/all"} className={ showNav ? "block" : "hidden md:block"}>
                Timesheets
              </Link>
            </li>
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start gap-2">
              <Link
                to={"/projects/all"}
                className="text-white mr-4 md:mr-0 text-lg md:text-3xl "
              >
                <FaProjectDiagram />
              </Link>
              <Link to={"/projects/all"} className={ showNav ? "block" : "hidden md:block"}>
                Projects
              </Link>
            </li>
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start gap-2">
              <Link
                to={"/tasks/all"}
                className="text-white mr-4 md:mr-0 text-lg md:text-3xl "
              >
                <FaTasks />
              </Link>
              <Link to={"/tasks/all"} className={ showNav ? "block" : "hidden md:block"}>
                Tasks
              </Link>
            </li>
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start justify-between gap-2">
              <Link
                to={"/entries/all"}
                className="text-white mr-4 md:mr-0 text-lg md:text-3xl"
              >
                <FaFileContract />
              </Link>
              <Link to={"/entries/all"} className={ showNav ? "block" : "hidden md:block"}>
                Entries
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setAuth(null);
                  navigate("/");
                }}
                className="flex items-start justify-bettwen font-semibold text-blue-950 gap-2"
              >
                <FaSignOutAlt className="text-white mr-4 md:mr-0 text-lg md:text-3xl " />
                <span className={ showNav ? "block" : "hidden md:block"}>Logout</span>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col items-start justify-start gap-[2rem] ml-auto">
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start justify-between md:justify-start gap-2">
              <Link to={"/"} className="text-white mr-4 text-lg md:text-3xl ">
                <FaHome />
              </Link>
              <Link to={"/"} className={ showNav ? "block" : "hidden md:block"}>
                Home
              </Link>
            </li>
            <li className="text-blue-950 font-bold text-lg hover:text-white transition-all flex items-start justify-start gap-2">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="flex items-center justify-start font-semibold text-blue-950 gap-2"
              >
                <FaSignInAlt className="text-lg md:text-2xl mr-4 text-white" />
                <span className={ showNav ? "block" : "hidden md:block"}>Login</span>
              </button>
            </li>
          </ul>
        )}
      </aside>
    </nav>
  );
};

export default Nav;
