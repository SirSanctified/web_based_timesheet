import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  deleteEntryById,
  getAllTimesheets,
  getEntryById,
  updateEntryById,
  getAllProjects,
  getAllTasks,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const EntryDetail = () => {
  const [entry, setEntry] = useState();
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const receivedEntry = await getEntryById(axioPrivate, id);
      const allTimesheets = await getAllTimesheets(axioPrivate);
      const allProjects = await getAllProjects(axioPrivate);
      const allTasks = await getAllTasks(axioPrivate);
      if (receivedEntry.error) {
        setError(receivedEntry.error);
      } else {
        setEntry(receivedEntry);
      }
      allTimesheets?.error
        ? setError(allTimesheets.error)
        : setTimesheets(allTimesheets);
      setProjects(allProjects);
      setTasks(allTasks);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEntry = await updateEntryById(axioPrivate, entry.id, {
      date: entry.date,
      hours: entry.hours,
      timesheetId: entry.timesheetId,
      projectId: entry.projectId,
      taskId: entry.taskId,
    });
    if (updatedEntry?.error) {
      setUpdated(false);
    } else {
      setUpdated(true);
      setTimeout(() => navigate(-1), 2000);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteEntryById(axioPrivate, id);
      navigate("/entries/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16 w-[100%]">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Edit Entry
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        entry && (
          <form onSubmit={handleSubmit} className="w-100 md:w-1/2 mx-auto">
            {updated && setTimeout(() => setUpdated(false), 1000) && (
              <p className="text-white bg-green-500 px-4 py-2 rounded z-20 text-center absolute top-[15%] right-[5%]">
                Entry updated successfully!
              </p>
            )}
            <div className="flex flex-col items-start w-[100%]">
              <label htmlFor="timesheetId">Timesheet</label>
              <select
                name="timesheetId"
                id="timesheetId"
                value={entry.timesheetId}
                onChange={(e) =>
                  setEntry(
                    (prev) => (prev = { ...prev, timesheetId: e.target.value })
                  )
                }
                className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
              >
                <option value="">Select parent timesheet</option>
                {timesheets &&
                  timesheets.map((timesheet) => (
                    <option key={timesheet.id} value={timesheet.id}>
                      {timesheet?.Employee?.firstName}&#39;s on {timesheet.date}{" "}
                      for {timesheet.hours} hours
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col items-start w-[100%]">
              <label htmlFor="projectId" className="text-[18px] mb-1">
                Entry For Project:
              </label>
              <select
                name="projectId"
                value={entry.projectId}
                onChange={(e) =>
                  setEntry(
                    (prev) => (prev = { ...prev, projectId: e.target.value })
                  )
                }
                id="projectId"
                className="mb-1 px-2 py-2 border border-gray-500 rounded-sm w-[100%]"
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
            </div>
            <div className="flex flex-col items-start w-[100%]">
              <label htmlFor="task" className="text-[18px] mb-1">
                Entry For Task:
              </label>
              <select
                name="taskId"
                value={entry.taskId}
                onChange={(e) =>
                  setEntry(
                    (prev) => (prev = { ...prev, taskId: e.target.value })
                  )
                }
                id="taskId"
                className="mb-1 px-2 py-2 border border-gray-500 rounded-sm w-[100%]"
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
            </div>
            <div className="flex flex-col items-start w-[100%]">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={entry.date}
                onChange={(e) =>
                  setEntry((prev) => (prev = { ...prev, date: e.target.value }))
                }
                className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
              />
            </div>
            <div className="flex flex-col items-start w-[100%]">
              <label htmlFor="hours">Hours</label>
              <input
                type="number"
                name="hours"
                id="hours"
                value={entry.hours}
                onChange={(e) =>
                  setEntry(
                    (prev) =>
                      (prev = { ...prev, hours: parseInt(e.target.value) })
                  )
                }
                className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
              />
            </div>
            <div className="flex items-center justify-around [w-100%]">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-900 text-white rounded-sm px-4 py-2"
              >
                Update
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
        )
      )}
    </main>
  );
};

export default EntryDetail;
