/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <section className="mt-[5rem] px-[2rem]">
      <h1 className="text-blue-950 font-bold text-2xl underline text-center">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-center">Welcome to the admin dashboard!</p>
      <article className="mt-[2rem] w-100 md:w-[60%] lg:w-[50%] border border-gray-400 mx-auto">
        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">Timesheets</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2 items-center">
            <Link to={'/timesheets/add'} className="bg-blue-700 text-white px-2 md:px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              Add
            </Link>
            <Link to={'/timesheets/all/'} className="bg-gray-700 text-white px-2 md:px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              View
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1  md:gap-4  border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">Employees</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2  py-2">
            <Link to={'/employees/add/'} className="bg-blue-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              Add
            </Link>
            <Link to={'/employees/all/'} className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              View
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between  gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">Projects</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2">
            <Link to={'/projects/add/'} className="bg-blue-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              Add
            </Link>
            <Link to={'/projects/all/'} className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              View
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">Tasks</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2">
            <Link to={'/tasks/add/'} className="bg-blue-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              Add
            </Link>
            <Link to={'/tasks/all/'} className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              View
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">Entries</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2">
            <Link to={'/entries/add/'} className="bg-blue-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              Add
            </Link>
            <Link to={'/entries/all/'} className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              View
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1  md:gap-4 border-gray-500 border">
          <h1 className="text-lg text-blue-950 p-3 ">Comments</h1>
          <div className="flex flex-wrap gap-1 lg:gap-4 w-fit border-l border-l-gray-500 px-2 py-2">
            <Link to={'/comments/all/'} className="bg-gray-700 text-white px-4 py-2 min-w-[100px] flex items-center justify-center rounded-sm">
              View
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AdminDashboard;
