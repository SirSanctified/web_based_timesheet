import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllTimesheets,
  insertEntry,
  getAllProjects,
  getAllTasks,
} from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Select from "../../components/Select";
import DateInput from "../../components/DateInput";
import NumberInput from "../../components/NumberInput";

const AddEntry = () => {
  const [errors, setErrors] = useState({});
  const [timesheets, setTimesheets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [entry, setEntry] = useState({
    timesheetId: null,
    taskId: null,
    projectId: null,
    date: "",
    hours: 0,
  });
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allTimesheets = await getAllTimesheets(axioPrivate);
      const allProjects = await getAllProjects(axioPrivate);
      const allTasks = await getAllTasks(axioPrivate);
      setTimesheets(allTimesheets);
      setProjects(allProjects);
      setTasks(allTasks);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!entry.timesheetId) {
      errors.timesheetId = "The timesheet must belong to an timesheet";
    }

    if (!entry.date) {
      errors.date = "The date is required for this timesheet";
    }

    if (!entry.hours) {
      errors.hours = "The hours are required for this timesheet";
    } else if (typeof hours !== "number") {
      errors.hours = "Hours should be a number";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    }
    // otherwise create the timesheet and redirect
    const response = await insertEntry(axioPrivate, { ...entry });
    if (response?.error) {
      errors.form = "Something went wrong, please try again";
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="px-8 pt-16 w-[100%]">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Entry
      </h1>
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <Select
            label="Entry For Timesheet:"
            name="timesheetId"
            value={entry.timesheetId}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, timesheetId: e.target.value }))
            }
            optionsArray={timesheets}
            defaultOption="Select parent Timesheet"
            error={timesheets.error}
          />
        </p>
        <p className="flex flex-col">
          <Select
            label="Entry For Project:"
            name="projectId"
            value={entry.projectId}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, projectId: e.target.value }))
            }
            optionsArray={projects}
            defaultOption="Select project"
            error={projects.error}
          />
        </p>
        <p className="flex flex-col">
          <Select
            name="taskId"
            label="Entry For Task:"
            value={entry.taskId}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, taskId: e.target.value }))
            }
            optionsArray={tasks}
            defaultOption="Select task"
            error={tasks.error}
          />
        </p>
        <p className="flex flex-col">
          <DateInput
            label="Entry Date"
            name="date"
            value={entry.date}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, date: e.target.value }))
            }
            error={errors?.date}
          />
        </p>
        <p className="flex flex-col">
          <NumberInput
            label="Entry Hours"
            value={entry.hours}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, hours: parseInt(e.target.value) }))
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

export default AddEntry;
