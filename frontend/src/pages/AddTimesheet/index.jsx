import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEmployees, insertTimesheet } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddTimesheet = () => {
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(0);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const all = await getAllEmployees(axioPrivate);
      setEmployees(all);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!employeeId) {
      errors.employeeId = "The timesheet must belong to an employee";
    }

    if (!date) {
      errors.date = "The date is required for this timesheet";
    }

    if (!hours) {
      errors.hours = "The hours are required for this timesheet";
    } else if (typeof hours !== "number") {
      errors.hours = "Hours should be a number";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    }
    // otherwise create the timesheet and redirect
    const response = await insertTimesheet(axioPrivate, {
      employeeId,
      date,
      hours,
    });
    if (response?.error) {
      errors.form = "Something went wrong, please try again";
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="px-8 pt-16">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Timesheet
      </h1>
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <label htmlFor="employeeId" className="text-[18px] mb-1">
            Timesheet For:
          </label>
          <select
            name="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            id="employeeId"
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            <option value="" className="px-2 py-2 border border-gray-500">
              Select Who&#39;s Timesheet Is This
            </option>
            {employees &&
              typeof employees === "object" &&
              Array.from(employees)?.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                  className="px-2 py-2 border border-gray-500"
                >
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
          {errors?.employeeId && (
            <span className="text-red-500">{errors.employeeId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="date" className="text-[18px] mb-1">
            Timesheet Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.date && <span className="text-red-500">{errors.date}</span>}
        </p>
        <p className="flex flex-col">
          <label htmlFor="hours" className="text-[18px] mb-1">
            Timesheet Hours
          </label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            placeholder="Timesheet hours"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.hours && (
            <span className="text-red-500">{errors.hours}</span>
          )}
        </p>
        <button
          type="submit"
          className="px-4 py-2 mt-4 bg-blue-700 rounded-sm min-w-[100px]"
        >
          Create
        </button>
      </form>
    </main>
  );
};

export default AddTimesheet;
