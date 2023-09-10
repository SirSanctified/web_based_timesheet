import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  deleteEntryById,
  getAllTimesheets,
  getEntryById,
  updateEntryById,
  getAllProjects,
  getAllTasks,
} from "../../api";
import DateInput from "../../components/DateInput"
import NumberInput from "../../components/NumberInput"
import Select from "../../components/Select"


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
            label="Entry Date:"
            name="date"
            value={entry.date}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </p>
        <p className="flex flex-col">
          <NumberInput
            label="Entry Hours:"
            value={entry.hours}
            handleChange={(e) =>
              setEntry((prev) => ({ ...prev, hours: parseInt(e.target.value) }))
            }
            placeholder="Entry hours"
          />
        </p>
            <div className="mt-5 flex items-center justify-around [w-100%]">
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
