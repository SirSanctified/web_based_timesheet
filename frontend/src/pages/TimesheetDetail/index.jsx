import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  deleteTimesheetById,
  getAllEmployees,
  getTimesheetById,
  getTimesheetEntries,
  updateTimesheetById,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const TimesheetDetail = () => {
  const [timesheet, setTimesheet] = useState();
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const receivedTimesheet = await getTimesheetById(axioPrivate, id);
      const allEmployees = await getAllEmployees(axioPrivate);
      const entries = await getTimesheetEntries(axioPrivate, id);
      if (receivedTimesheet.error) {
        setError(receivedTimesheet.error);
      } else {
        setTimesheet(receivedTimesheet);
        setDate(receivedTimesheet.date);
        setHours(receivedTimesheet.hours);
        setEmployeeId(receivedTimesheet.employeeId);
      }
      allEmployees?.error
        ? setError(allEmployees.error)
        : setEmployees(allEmployees);
      entries?.error ? setError(entries.error) : setTimesheetEntries(entries);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTimesheet = await updateTimesheetById(axioPrivate, id, {
      date,
      hours,
      employeeId,
    });
    if (updatedTimesheet?.error) {
      setUpdated(false);
    } else {
      setTimesheet({ date, hours, employeeId });
      setUpdated(true);
      setTimeout(() => navigate(-1), 2000);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteTimesheetById(axioPrivate, id);
      navigate("/timesheets/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16 w-[100%]">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Edit Timesheet
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-100 md:w-1/2 mx-auto">
          {updated && setTimeout(() => setUpdated(false), 1000) && (
            <p className="text-white bg-green-500 px-4 py-2 rounded z-20 text-center absolute top-[15%] right-[5%]">
              Timesheet updated successfully!
            </p>
          )}
          <div className="flex flex-col items-start w-[100%]">
            <label htmlFor="employeeId">Employee</label>
            <select
              name="employeeId"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
            >
              <option value="">Select an employee</option>
              {employees &&
                employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col items-start w-[100%]">
            <label
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
            />
          </div>
          <div className="flex flex-col items-start w-[100%]">
            <label
              htmlFor="hours"
            >
              Hours
            </label>
            <input
              type="number"
              name="hours"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
            />
          </div>
          <div className="flex items-center justify-around [w-100%]">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-white rounded-sm px-4 py-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-900 text-white rounded-sm px-4 py-2"
            >
              Delete
            </button>
          </div>
        </form>
      )}
      {timesheetEntries && <h1 className="text-blue-950 text-2xl font-bold mt-8 w-fit mx-auto">Timesheet Entries</h1>}
       {timesheetEntries && timesheetEntries.map((timesheetEntry, index) => (          
            <div
              key={timesheetEntry.id}
              className="flex flex-col items-center mt-4 list-none w-[100%] md:w-[50%] md:mx-auto"
            >
              <div className="flex border gap-2 px-4 py-2 border-gray-500 w-[100%]">
                <p className="text-blue-950 font-normal text-xl">{index + 1}. On {timesheetEntry.date}</p>
                <p className="text-blue-950 font-normal text-xl">
                  for {timesheetEntry.hours}
                </p>
              </div>
            </div>
          ))}
    </main>
  );
};

export default TimesheetDetail;
