/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6"

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-[5rem] mr-4 w-[100%]">
    <div className="absolute top-4 right-8 w-max rounded-lg p-2 bg-gray-500 hover:cursor-pointer">
      <FaUser className="text-3xl md:text-5xl text-gray-900 hover:text-blue-800" onClick={() => navigate("/employees/me")} />
    </div>
      <h1 className="text-blue-950 font-bold text-2xl underline text-center">
        Employee Dashboard
      </h1>
      <p className="mt-2 text-center">Welcome to the employee dashboard!</p>
      <article className="mt-[2rem] w-100 md:w-[60%] lg:w-[50%] border border-gray-400 mx-auto">
        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">My Timesheets</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2 items-center">
            <Link
              to={"/timesheets/add"}
              className="bg-blue-700 text-white px-2 md:px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm"
            >
              Add
            </Link>
            <Link
              to={"/timesheets/all/"}
              className="bg-gray-700 text-white px-2 md:px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm"
            >
              View
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">My Entries</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2">
            <Link
              to={"/entries/add/"}
              className="bg-blue-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm"
            >
              Add
            </Link>
            <Link
              to={"/entries/all/"}
              className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm"
            >
              View
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">My Tasks</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2">
            <Link
              to={"/tasks/all/"}
              className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm"
            >
              View
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};

export default EmployeeDashboard;
