import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllProjects, deleteProjectById } from "../../api";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const allProjects = await getAllProjects(axioPrivate);
      allProjects?.error
        ? setError("Something went wrong, please try again.")
        : setProjects(allProjects);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProjectById(axioPrivate, id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16 mx-8">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Available projects
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="w-fit mx-auto max-w-[100vw] overflow-scroll no-scrollbar">
          <Link
            to="/projects/add"
            className="bg-blue-700 text-white px-4 py-2 rounded-sm align-middle hover:bg-blue-800"
          >
            Add New Project
          </Link>
          {projects.length > 0 ? (
            <table className="border border-gray-500 w-fit rounded-sm mt-2">
              <thead>
                <tr className="border border-gray-500">
                  <td className="border border-gray-500 p-4 align-middle"></td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    Name
                  </td>
                  <td className="border border-gray-500 p-4 align-middle text-xl font-bold text-blue-950">
                    Code
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
                {projects &&
                  projects.map((project, index) => {
                    return (
                      <tr key={project.id} className="border border-gray-500">
                        <td className="border border-gray-500 p-4 align-middle md:min-w-[100px]">
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-blue-700 underline font-bold align-middle"
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {project.projectName}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {project.projectCode}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {project.projectStartDate}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {project.projectEndDate ? project.projectEndDate : "Unspecified"}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          {project.projectStatus}
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-white bg-blue-700 rounded-sm px-4 py-2 hover:bg-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-4 align-middle">
                          <button
                            onClick={() => handleDelete(project.id)}
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
              No projects available
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Projects;
