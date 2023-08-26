import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllProjects, deleteTaskById, getAllTasks } from "../../api";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      try {
        const allProjects = await getAllProjects(axioPrivate);
        const allTasks = await getAllTasks(axioPrivate);
        allProjects?.error
          ? setError("Something went wrong, please try again.")
          : setProjects(allProjects);
        allTasks?.error
          ? setError("Something went wrong, please try again.")
          : setTasks(allTasks);
        setIsLoading(false);
      } catch (error) {
        setError("Something went wrong, please try again.");
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTaskById(axioPrivate, id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Available Tasks
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : isLoading ? (
        <p className="flex items-center justify-center w-screen h-screen">
          <ClipLoader
            color="#2563EB"
            loading={isLoading}
            size={150}
            css="display: block; margin: auto;"
          />
        </p>
      ) : (
        <div className="w-fit mx-auto max-w-[100vw] overflow-scroll">
          <Link
            to="/tasks/add"
            className="bg-blue-700 text-white px-4 py-2 rounded-sm align-middle hover:bg-blue-800"
          >
            Add New task
          </Link>
          {tasks.length > 0 ? (
            <table className="border border-gray-500 w-fit rounded-sm mt-2">
              <thead>
                <tr className="border border-gray-500">
                  <td className="border border-gray-500 p-4 align-middle"></td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    Name
                  </td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    Project
                  </td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    Start Date
                  </td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    End Date
                  </td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    Status
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {tasks &&
                  tasks.map((task, index) => {
                    return (
                      <tr key={task.id} className="border border-gray-500">
                        <td className="border border-gray-500 p-4 align-middle md:min-w-[100px]">
                          <Link
                            to={`/tasks/${task.id}`}
                            className="text-blue-700 underline font-bold align-middle"
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {task.taskName}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {
                            projects.find(
                              (project) => project.id === task.projectId
                            )?.projectName
                          }
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {task.taskStartDate}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {task.taskEndDate ? task.taskEndDate : "Unspecified"}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {task.taskStatus}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          <Link
                            to={`/tasks/${task.id}`}
                            className="text-white bg-blue-700 rounded-sm px-4 py-2 hover:bg-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="text-white bg-red-500 rounded-sm px-4 py-2 hover:bg-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-blue-950 text-xl font-bold mt-4">
              No tasks available
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Tasks;
