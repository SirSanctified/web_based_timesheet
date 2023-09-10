import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteProjectById,
  getProjectById,
  updateProjectById,
} from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextInput from "../../components/TextInput";
import DateInput from "../../components/DateInput";
import Description from "../../components/DescriptionInput";
import SelectStatus from "../../components/SelectStatus";
import { status } from "../../constants";

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
        setErrors((prev) => (prev = { ...prev, form: response.error }));
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
      setErrors(
        (prev) =>
          (prev = { ...prev, form: "Something went wrong, please try again" })
      );
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
          <TextInput
            name="projectName"
            label="Project Name:"
            value={project.projectName}
            placeholder="Project Name"
            handleChange={(e) =>
              setProject((prev) => ({ ...prev, projectName: e.target.value }))
            }
            error={errors?.projectName}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Project Code:"
            name="projectCode"
            value={project.projectCode}
            placeholder="Project Code"
            handleChange={(e) =>
              setProject((prev) => ({ ...prev, projectCode: e.target.value }))
            }
            error={errors?.projectCode}
          />
        </p>
        <p className="flex flex-col">
          <Description
            name="projectDescription"
            label="Project Description (optional):"
            value={project.projectDescription}
            handleChange={(e) =>
              setProject((prev) => ({
                ...prev,
                projectDescription: e.target.value,
              }))
            }
            placeholder="Project Description"
            error={errors?.projectDescription}
          />
        </p>
        <p className="flex flex-col">
          <DateInput
            label="Project Start Date"
            name="projectStartDate"
            value={project.projectStartDate}
            handleChange={(e) =>
              setProject((prev) => ({
                ...prev,
                projectStartDate: e.target.value,
              }))
            }
            error={errors?.projectStartDate}
          />
        </p>
        <p className="flex flex-col">
          <DateInput
            label="Project End Date"
            name="projectEndDate"
            value={project.projectEndDate}
            handleChange={(e) =>
              setProject((prev) => ({
                ...prev,
                projectEndDate: e.target.value,
              }))
            }
            error={errors?.projectEndDate}
          />
        </p>
        <p className="flex flex-col">
          <SelectStatus
            label="Project Status:"
            name="projectStatus"
            value={project.projectStatus}
            optionValues={status}
            handlechange={(e) =>
              setProject((prev) => ({ ...prev, projectStatus: e.target.value }))
            }
            error={errors?.projectStatus}
          />
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
