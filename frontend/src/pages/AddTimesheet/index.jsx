import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEmployees, insertTimesheet } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Select from "../../components/Select";
import DateInput from "../../components/DateInput";
import NumberInput from "../../components/NumberInput";

const AddTimesheet = () => {
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [timesheet, setTimesheet] = useState({
    employeeId: "",
    date: "",
    hours: 0,
  });
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
    if (!timesheet.employeeId) {
      errors.employeeId = "The timesheet must belong to an employee";
    }

    if (!timesheet.date) {
      errors.date = "The date is required for this timesheet";
    }

    if (!timesheet.hours) {
      errors.hours = "The hours are required for this timesheet";
    } else if (typeof hours !== "number") {
      errors.hours = "Hours should be a number";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    }
    // otherwise create the timesheet and redirect
    const response = await insertTimesheet(axioPrivate, { ...timesheet });
    if (response?.error) {
      errors.form = "Something went wrong, please try again";
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="px-8 pt-16 w-[100%]">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Timesheet
      </h1>
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <Select
            label="Timesheet For:"
            name="employeeId"
            value={timesheet.employeeId}
            handleChange={(e) =>
              setTimesheet((prev) => ({ ...prev, employeeId: e.target.value }))
            }
            defaultOption="Select Who&#39;s Timesheet Is This"
            optionsArray={employees}
            error={errors?.employeeId}
          />
        </p>
        <p className="flex flex-col">
          <DateInput
            label="Timesheet Date"
            name="date"
            value={timesheet.date}
            handleChange={(e) =>
              setTimesheet((prev) => ({ ...prev, date: e.target.value }))
            }
            error={errors?.date}
          />
        </p>
        <p className="flex flex-col">
          <NumberInput
            label="Timesheet Hours"
            name="hours"
            value={timesheet.hours}
            handleChange={(e) =>
              setTimesheet((prev) => ({
                ...prev,
                hours: parseInt(e.target.value),
              }))
            }
            placeholder="Timesheet hours"
            error={errors?.hours}
          />
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
