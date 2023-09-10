import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { insertProject } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SelectStatus from "../../components/SelectStatus";
import { status } from "../../constants";
import DateInput from "../../components/DateInput";
import Description from "../../components/DescriptionInput";
import TextInput from "../../components/TextInput";

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
