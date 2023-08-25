import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProjectById, getProjectById, updateProjectById } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProjectDetail = () => {
  const [errors, setErrors] = useState({});
  const [project, setProject] = useState({});
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getProject() {
      const response = await getProjectById(axioPrivate, id);
      if (response?.error) {
        setErrors((prev) => prev = {...prev, form: response.error });
      } else {
        setProject(response);
      }
    }
    getProject();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!project.projectName) {
      errors.projectName = "Name is required for this project";
    }

    if (!project.projectCode) {
      errors.projectCode = "The project code is required for this project";
    }

    if (project.projectDescription && project.projectDescription.length < 15) {
      errors.projectDescription = "The project description too short";
    }

    if (!project.projectStartDate) {
      errors.projectStartdate = "The project start date is required";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    }
    // otherwise create the project and redirect
    const response = await updateProjectById(axioPrivate, id, {
      projectName: project.projectName,
      projectCode: project.projectCode,
      projectDescription: project.projectDescription,
      projectStartDate: project.projectStartDate,
      projectEndDate: project.projectEndDate,
      projectStatus: project.projectStatus,
    });
    if (response?.error) {
      setErrors(prev => prev ={...prev, form: "Something went wrong, please try again"});
    } else {
      navigate(-1);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteProjectById(axioPrivate, id);
      navigate("/entries/all");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(project);
  return (
    <main className=" w-[100%] pt-16">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Project
      </h1>
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <label htmlFor="projectName" className="text-[18px] mb-1">
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={project.projectName}
            placeholder="Project Name"
            onChange={(e) => setProject(prev => prev = {...prev, projectName: e.target.value })}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.projectName && (
            <span className="text-red-500">{errors.projectName}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="projectCode" className="text-[18px] mb-1">
            Project Code
          </label>
          <input
            type="text"
            id="projectCode"
            name="projectCode"
            value={project.projectCode}
            placeholder="Project Code"
            onChange={(e) => setProject(prev => prev = {...prev, projectCode: e.target.value })}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.projectCode && (
            <span className="text-red-500">{errors.projectCode}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="projectDescription" className="text-[18px] mb-1">
            Project Description (optional):
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={project.projectDescription}
            onChange={(e) => setProject(prev => prev = {...prev, projectDescription: e.target.value })}
            placeholder="Project Description"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.projectDescription && (
            <span className="text-red-500">{errors.projectDescription}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="projectStartDate" className="text-[18px] mb-1">
            Project Start Date
          </label>
          <input
            type="date"
            id="projectStartDate"
            name="projectStartDate"
            value={project.projectStartDate}
            onChange={(e) => setProject(prev => prev = {...prev, projectStartDate: e.target.value })}
            placeholder="project projectStartDate"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.projectStartDate && (
            <span className="text-red-500">{errors.projectStartDate}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="projectEndDate" className="text-[18px] mb-1">
            Project End Date
          </label>
          <input
            type="date"
            id="projectEndDate"
            name="projectEndDate"
            value={project.projectEndDate}
            onChange={(e) => setProject(prev => prev = {...prev, projectEndDate: e.target.value })}
            placeholder="project projectEndDate"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.projectEndDate && (
            <span className="text-red-500">{errors.projectEndDate}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="projectStatus" className="text-[18px] mb-1">
            Project Status:
          </label>
          <input
            type="text"
            id="projectStatus"
            name="projectStatus"
            value={project.projectStatus}
            onChange={(e) => setProject(prev => prev = {...prev, projectStatus: e.target.value })}
            placeholder="project projectStatus"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.projectStatus && (
            <span className="text-red-500">{errors.projectStatus}</span>
          )}
        </p>
        <div className="flex items-center justify-around [w-100%] mt-8">
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
      {project?.Tasks?.length > 0 && (
        <section className="mt-4 w-full md:w-1/2 pr-4 mx-auto">
          <h1 className="py-4 text-center text-blue-950 text-xl font-semibold">
            Tasks Assigned
          </h1>
          <table className="w-[100%]">
            <thead>
              <tr className="border border-gray-500">
                <td className=" py-1 px-2 font-semibold">Name</td>
                <td className=" py-1 px-2 font-semibold">Start Date</td>
                <td className=" py-1 px-2 font-semibold">Status</td>
              </tr>
            </thead>
            <tbody>
              {project.Tasks.map((task) => (
                <tr key={task.id} className="border border-gray-500">
                  <td className=" py-1 px-2">{task.taskName}</td>
                  <td className=" py-1 px-2">{task.taskStartDate}</td>
                  <td className=" py-1 px-2">{task.taskStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
};

export default ProjectDetail;
