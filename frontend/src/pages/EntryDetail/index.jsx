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
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [timesheetId, setTimesheetId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");
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
        setDate(receivedEntry.date);
        setHours(receivedEntry.hours);
        setTimesheetId(receivedEntry.timesheetId);
      }
      allTimesheets?.error
        ? setError(allTimesheets.error)
        : setTimesheets(allTimesheets);
      setProjectId(receivedEntry.projectId);
      setTaskId(receivedEntry.taskId);
      setProjects(allProjects);
      setTasks(allTasks);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEntry = await updateEntryById(axioPrivate, entry.id, {
      date,
      hours,
      timesheetId,
      projectId,
      taskId,
    });
    if (updatedEntry?.error) {
      setUpdated(false);
    } else {
      setEntry({ date, hours, timesheetId });
      setUpdated(true);
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
              value={timesheetId}
              onChange={(e) => setTimesheetId(e.target.value)}
              className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
            >
              <option value="">Select parent timesheet</option>
              {timesheets &&
                timesheets.map((timesheet) => (
                  <option key={timesheet.id} value={timesheet.id}>
                    on {timesheet.date} for {timesheet.hours}
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
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
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
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
            />
          </div>
          <div className="flex flex-col items-start w-[100%]">
            <label htmlFor="hours">Hours</label>
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
      )}
    </main>
  );
};

export default EntryDetail;
