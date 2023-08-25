import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllTimesheets,
  insertEntry,
  getAllProjects,
  getAllTasks,
} from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
          <label htmlFor="timesheetId" className="text-[18px] mb-1">
            Entry For Timesheet:
          </label>
          <select
            name="timesheetId"
            value={entry.timesheetId}
            onChange={(e) =>
              setEntry((prev) => ({ ...prev, timesheetId: e.target.value }))
            }
            id="timesheetId"
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            <option value="" className="px-2 py-2 border border-gray-500">
              Select parent Timesheet
            </option>
            {timesheets &&
              !timesheets.error &&
              Array.from(timesheets)?.map((timesheet) => (
                <option
                  key={timesheet.id}
                  value={timesheet.id}
                  className="px-2 py-2 border border-gray-500"
                >
                  on {timesheet.date} for {timesheet.hours}
                </option>
              ))}
          </select>
          {errors?.timesheetId && (
            <span className="text-red-500">{errors.timesheetId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="projectId" className="text-[18px] mb-1">
            Entry For Project:
          </label>
          <select
            name="projectId"
            value={entry.projectId}
            onChange={(e) =>
              setEntry((prev) => ({ ...prev, projectId: e.target.value }))
            }
            id="projectId"
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            <option value="" className="px-2 py-2 border border-gray-500">
              Select project
            </option>
            {projects &&
              !projects.error &&
              Array.from(projects)?.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                  className="px-2 py-2 border border-gray-500"
                >
                  {project.projectName} - {project.projectCode}
                </option>
              ))}
          </select>
          {errors?.projectId && (
            <span className="text-red-500">{errors.projectId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="task" className="text-[18px] mb-1">
            Entry For Task:
          </label>
          <select
            name="taskId"
            value={entry.taskId}
            onChange={(e) =>
              setEntry((prev) => ({ ...prev, taskId: e.target.value }))
            }
            id="taskId"
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            <option value="" className="px-2 py-2 border border-gray-500">
              Select Task
            </option>
            {tasks &&
              !tasks.error &&
              Array.from(tasks)?.map((task) => (
                <option
                  key={task.id}
                  value={task.id}
                  className="px-2 py-2 border border-gray-500"
                >
                  {task.taskName}
                </option>
              ))}
          </select>
          {errors?.taskId && (
            <span className="text-red-500">{errors.taskId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="date" className="text-[18px] mb-1">
            Entry Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={entry.date}
            onChange={(e) =>
              setEntry((prev) => ({ ...prev, date: e.target.value }))
            }
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.date && <span className="text-red-500">{errors.date}</span>}
        </p>
        <p className="flex flex-col">
          <label htmlFor="hours" className="text-[18px] mb-1">
            Entry Hours
          </label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={entry.hours}
            onChange={(e) =>
              setEntry((prev) => ({ ...prev, hours: parseInt(e.target.value) }))
            }
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

export default AddEntry;
