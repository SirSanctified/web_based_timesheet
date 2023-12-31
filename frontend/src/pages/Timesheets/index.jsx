import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  getAllTimesheets,
  getAllEmployees,
  deleteTimesheetById,
} from "../../api";
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

  const handleDelete = async (id) => {
    try {
      await deleteTimesheetById(axioPrivate, id);
      setTimesheets(timesheets.filter((timesheet) => timesheet.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Available Timesheets
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="w-fit mx-auto">
          <Link
            to="/timesheets/add"
            className="bg-blue-700 text-white px-4 py-2 rounded-sm hover:bg-blue-800"
          >
            Add New Timesheet
          </Link>
          <table className="border border-gray-500 w-fit rounded-sm mt-2">
            <thead>
              <tr className="border border-gray-500">
                <td className="border border-gray-500 p-2 align-middle"></td>
                <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                  Employee
                </td>
                <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                  Date
                </td>
                <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                  Hours
                </td>
                <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                  Status
                </td>
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
                      <td className="border border-gray-500 p-2 align-middle md:min-w-[100px]">
                        <Link
                          to={`/timesheets/${timesheet.id}`}
                          className="text-blue-700 underline font-bold align-middle"
                        >
                          {index + 1}
                        </Link>
                      </td>
                      <td className="border border-gray-500 p-2 align-middle">
                        {employee?.firstName} {employee?.lastName}
                      </td>
                      <td className="border border-gray-500 p-2 align-middle">
                        {timesheet.date}
                      </td>
                      <td className="border border-gray-500 p-2 align-middle">
                        {timesheet.hours}
                      </td>
                      <td className={timesheet.status === "approved" ? "text-green-500 border border-gray-500 p-2 align-middle " : timesheet.status === "pending" ? "text-yellow-500 border border-gray-500 p-2 align-middle" : "text-red-500 border border-gray-500 p-2 align-middle" }>
                        {timesheet.status === "approved" ? "Approved" : timesheet.status === "pending" ? "Pending" : "Rejected"}
                      </td>
                      <td className="border border-gray-500 p-2 align-middle">
                        <Link
                          to={`/timesheets/approve/${timesheet.id}`}
                          className="bg-green-700 text-white px-2 py-1 min-w-[100px] flex items-center justify-center rounded-sm"
                        >
                          Approve
                        </Link>
                      </td>
                      <td className="border border-gray-500 p-2 align-middle">
                        <Link
                          to={`/timesheets/${timesheet.id}`}
                          className="text-white bg-blue-700 rounded-sm px-2 py-1 hover:bg-blue-900"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="border border-gray-500 p-2 align-middle">
                        <button
                          onClick={() => handleDelete(timesheet.id)}
                          className="text-white bg-red-500 rounded-sm px-2 py-1 hover:bg-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Timesheets;
