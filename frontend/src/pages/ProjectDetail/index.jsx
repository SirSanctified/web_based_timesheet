import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProjectById, getProjectById, updateProjectById } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProjectDetail = () => {
  const [errors, setErrors] = useState({});
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("on hold");
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getProject() {
      const response = await getProjectById(axioPrivate, id);
      if (response.error) {
        setErrors((prev) => (prev.form = response.error));
      } else {
        setProjectName(response.projectName);
      setProjectCode(response.projectCode);
      setProjectDescription(response.projectDescription);
      setProjectStartDate(response.projectStartDate);
      setProjectEndDate(response.projectEndDate);
      setProjectStatus(response.projectStatus);
      }
    }
    getProject();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!projectName) {
      errors.projectName = "Name is required for this project";
    }

    if (!projectCode) {
      errors.projectCode = "The project code is required for this project";
    }

    if (projectDescription && projectDescription.length < 15) {
      errors.projectDescription = "The project description too short";
    }

    if (!projectStartDate) {
      errors.projectStartdate = "The project start date is required";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    }
    // otherwise create the project and redirect
    const response = await updateProjectById(axioPrivate, id, {
      projectName,
      projectCode,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectStatus,
    });
    if (response?.error) {
      errors.form = "Something went wrong, please try again";
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
            value={projectName}
            placeholder="Project Name"
            onChange={(e) => setProjectName(e.target.value)}
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
            value={projectCode}
            placeholder="Project Code"
            onChange={(e) => setProjectCode(e.target.value)}
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
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
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
            value={projectStartDate}
            onChange={(e) => setProjectStartDate(e.target.value)}
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
            value={projectEndDate}
            onChange={(e) => setProjectEndDate(e.target.value)}
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
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
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
    </main>
  );
};

export default ProjectDetail;
