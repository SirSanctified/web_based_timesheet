import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { insertProject } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddProject = () => {
  const [errors, setErrors] = useState({});
  const [project, setProject] = useState({
    projectName: "",
    projectCode: "",
    projectDescription: "",
    projectStartDate: null,
    projectEndDate: null,
    projectStatus: "on hold",
  });
  const [formError, setFormError] = useState(false);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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
      errors.projectStartDate = "The project start date is required";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      // otherwise create the project and redirect
      const response = await insertProject(axioPrivate, { ...project });
      if (response) {
        errors.form = "Something went wrong, please try again";
        setErrors(errors);
        setFormError((prev) => !prev);
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <main className="px-8 pt-16 w-[100%]">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Project
      </h1>
      {formError && setTimeout(() => setFormError(false), 3000) && (
        <p className="bg-red-500 text-white px-4 py-2 rounded absolute top-[15%] right-[5%]">
          {errors.form}
        </p>
      )}
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
            onChange={(e) =>
              setProject((prev) => ({ ...prev, projectName: e.target.value }))
            }
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
            onChange={(e) =>
              setProject((prev) => ({ ...prev, projectCode: e.target.value }))
            }
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
            onChange={(e) =>
              setProject((prev) => ({
                ...prev,
                projectDescription: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setProject((prev) => ({
                ...prev,
                projectStartDate: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setProject((prev) => ({
                ...prev,
                projectEndDate: e.target.value,
              }))
            }
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
          <select
            id="projectStatus"
            name="projectStatus"
            value={project.projectStatus}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, projectStatus: e.target.value }))
            }
            placeholder="project projectStatus"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          >
            <option value="on hold">On Hold</option>
            <option value="in progress">In Progress</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          {errors?.projectStatus && (
            <span className="text-red-500">{errors.projectStatus}</span>
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

export default AddProject;
