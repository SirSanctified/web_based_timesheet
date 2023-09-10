import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { getAllProjects, insertTask, getAllEmployees } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextInput from "../../components/TextInput";
import Description from "../../components/DescriptionInput";
import DateInput from "../../components/DateInput";
import SelectStatus from "../../components/SelectStatus";
import Select from "../../components/Select";
import { status } from "../../constants";

const AddTask = () => {
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskEmployees, setTaskEmployees] = useState([]);
  const [task, setTask] = useState({
    projectId: "",
    taskStartDate: Date.now(),
    taskEndDate: "",
    taskName: "",
    taskDescription: "",
    taskStatus: "on hold",
  });
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allEmployees = await getAllEmployees(axioPrivate);
      const allProjects = await getAllProjects(axioPrivate);
      setEmployees(allEmployees);
      setProjects(allProjects);
    })();
  }, []);

  const options = employees.map((employee) => ({
    label: `${employee.firstName} ${employee.lastName}`,
    value: employee.id,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!task.projectId) {
      errors.projectId = "The task must belong to a project";
    }

    if (!task.taskStartDate) {
      errors.taskStartDate = "The start date is required for this task";
    }

    if (!task.taskName) {
      errors.taskName = "The name is required for this task";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      // otherwise create the task and redirect
      const response = await insertTask(axioPrivate, {
        ...task,
        employees: taskEmployees,
        taskEndDate: task.taskEndDate || null,
        projectId: task.projectId || null,
      });
      if (response?.error) {
        errors.form = "Something went wrong, please try again";
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <main className="px-8 pt-16 w-[100%]">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Task
      </h1>
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <Select
            label="Task For Project:"
            name="projectId"
            value={task.projectId}
            handleChange={(e) =>
              setTask((prev) => ({ ...prev, projectId: e.target.value }))
            }
            optionsArray={projects}
            error={errors?.projectId}
            defaultOption="Select parent project"
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskEmployees" className="text-[18px] mb-1">
            Employees Working on Task:
          </label>
          <MultiSelect
            options={options}
            value={task.taskEmployees}
            onChange={setTaskEmployees}
            labelledBy="Select Employees"
          />
          {errors?.taskEmployees && (
            <span className="text-red-500">{errors.taskEmployees}</span>
          )}
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Task Name"
            name="taskName"
            value={task.taskName}
            handleChange={(e) =>
              setTask((prev) => ({ ...prev, taskName: e.target.value }))
            }
            placeholder="Task Name"
            error={errors?.taskName}
          />
        </p>
        <p className="flex flex-col">
          <Description
            label="Task Description"
            name="taskDescription"
            value={task.taskDescription}
            handleChange={(e) =>
              setTask((prev) => ({ ...prev, taskDescription: e.target.value }))
            }
            placeholder="Task Description"
            error={errors?.taskDescription}
          />
        </p>
        <p className="flex flex-col">
          <DateInput
            label="Task Start Date"
            name="taskStartDate"
            value={task.taskStartDate}
            handleChange={(e) =>
              setTask((prev) => ({ ...prev, taskStartDate: e.target.value }))
            }
            error={errors?.taskStartDate}
          />
        </p>
        <p className="flex flex-col">
          <DateInput
            label="Task End Date"
            name="taskEndDate"
            value={task.taskEndDate}
            handleChange={(e) =>
              setTask((prev) => ({ ...prev, taskEndDate: e.target.value }))
            }
            error={errors?.taskEndDate}
          />
        </p>
        <p className="flex flex-col">
          <SelectStatus
            label="Entry Task Status"
            name="taskStatus"
            value={task.taskStatus}
            handlechange={(e) =>
              setTask((prev) => ({ ...prev, taskStatus: e.target.value }))
            }
            optionValues={status}
            error={errors?.taskStatus}
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

export default AddTask;
