/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData } from "react-router-dom";
import { getAllTimesheets } from "../../api";
import StatsCard from "../../components/StatsCard";

const AdminDashboard = () => {
  const timesheets = useLoaderData();
  return (
    <section className="mt-[5rem] px-[2rem]">
      <h1 className="text-blue-950 font-bold text-2xl underline">
        Admin Dashboard
      </h1>
      <p className="mt-2">Welcome to the admin dashboard!</p>
      <div className="mt-4 flex flex-wrap gap-[1rem]">
        <StatsCard stateName="timesheets" stateValue={timesheets?.length} color="orange" />
        <StatsCard stateName="Employees" stateValue={timesheets?.length} color="steelblue" />
        <StatsCard stateName="Projects" stateValue={timesheets?.length} color="green" />
        <StatsCard stateName="Tasks" stateValue={timesheets?.length} color="yellow" />
      </div>
      <h3 className="mt-8 text-lg text-center font-semibold">
        Timesheets 
      </h3>
      <table className="w-full border rounded">
        <thead>
          <tr className="border bg-blue-200">
            <th className="text-center px-2 py-4">Name</th>
            <th className="text-center px-2 py-4">Description</th>
            <th className="text-center px-2 py-4">Manager</th>
            <th className="text-center px-2 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets?.map((timesheet) => (
            <tr key={timesheet.id}>
              <td className="text-center border-r p-2">{timesheet.timesheetName}</td>
              <td className="text-center border-r p-2">{timesheet.timesheetDescription}</td>
              <td className="text-center border-r p-2">{timesheet.timesheetManager}</td>
              <td className="text-center border-r p-2">
                <Link to={`/dashboard/timesheets/${timesheet.id}`}>
                  <button className="bg-blue-800 text-white px-2 py-1 rounded-sm">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
};

export const loader = async () => {
  const timesheets = await getAllTimesheets();
  return timesheets;
};

export default AdminDashboard;
