import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllTimesheets, getAllEmployees } from "../../api";
import { Link } from "react-router-dom";

const Timesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const allTimesheets = await getAllTimesheets(axioPrivate);
      const allEmployees = await getAllEmployees(axioPrivate);
      allTimesheets?.error
        ? setError(allTimesheets.error)
        : setTimesheets(allTimesheets);
      allEmployees?.error
        ? setError(allEmployees.error)
        : setEmployees(allEmployees);
    })();
  }, []);
  return (
    <main className="mt-16 mx-8">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">Available Timesheets</h1>
      <table className="border border-gray-500 w-fit rounded-sm mx-auto">
        <thead>
          <tr className="border border-gray-500">
            <td className="border border-gray-500 p-4 align-middle"></td>
            <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">Employee</td>
            <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">Date</td>
            <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">Hours</td>
            <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">Status</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {timesheets &&
            timesheets.map((timesheet, index) => {
              const employee = employees?.find(
                (emp) => emp.id === timesheet.employeeId
              );
              return (
                <tr key={timesheet.id} className="border border-gray-500">
                  <td className="border border-gray-500 p-4 align-middle md:min-w-[100px]">
                    <Link to={`/timesheets/${timesheet.id}`} className="text-blue-700 underline font-bold align-middle">{index + 1}</Link>
                  </td>
                  <td className="border border-gray-500 p-4 align-middle">
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td className="border border-gray-500 p-4 align-middle">{timesheet.date}</td>
                  <td className="border border-gray-500 p-4 align-middle">{timesheet.hours}</td>
                  <td className="border border-gray-500 p-4 align-middle">{timesheet.status}</td>
                  <td className="border border-gray-500 p-4 align-middle">
                    <Link to={`/timesheets/${timesheet.id}`} className="text-white bg-blue-700 rounded-sm px-4 py-2 hover:bg-blue-900">Edit</Link>
                  </td>
                  <td className="border border-gray-500 p-4 align-middle">
                    <button className="text-white bg-red-500 rounded-sm px-4 py-2 hover:bg-red-900">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};

export default Timesheets;
