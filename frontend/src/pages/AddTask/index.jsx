import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { getAllProjects, insertTask, getAllEmployees } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
          <label htmlFor="projectId" className="text-[18px] mb-1">
            Task For Project:
          </label>
          <select
            name="projectId"
            value={task.projectId}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, projectId: e.target.value }))
            }
            id="projectId"
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            <option value="" className="px-2 py-2 border border-gray-500">
              Select parent project
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
          {errors?.projectId && (
            <span className="text-red-500">{errors.projectId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskEmployees" className="text-[18px] mb-1">
            Employees Working on Task:
          </label>
          <MultiSelect
            options={options}
            value={taskEmployees}
            onChange={setTaskEmployees}
            labelledBy="Select Employees"
          />
          {errors?.taskEmployees && (
            <span className="text-red-500">{errors.taskEmployees}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskName" className="text-[18px] mb-1">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={task.taskName}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, taskName: e.target.value }))
            }
            placeholder="Task Name"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.taskName && (
            <span className="text-red-500">{errors.taskName}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskDescription" className="text-[18px] mb-1">
            Task Description
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            value={task.taskDescription}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, taskDescription: e.target.value }))
            }
            placeholder="Task Description"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.taskDescription && (
            <span className="text-red-500">{errors.taskDescription}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskStartDate" className="text-[18px] mb-1">
            Task Start Date
          </label>
          <input
            type="date"
            id="taskStartDate"
            name="taskStartDate"
            value={task.taskStartDate}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, taskStartDate: e.target.value }))
            }
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.taskStartDate && (
            <span className="text-red-500">{errors.taskStartDate}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskEndDate" className="text-[18px] mb-1">
            Task End Date
          </label>
          <input
            type="date"
            id="taskEndDate"
            name="taskEndDate"
            value={task.taskEndDate}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, taskEndDate: e.target.value }))
            }
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.taskEndDate && (
            <span className="text-red-500">{errors.taskEndDate}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="taskStatus" className="text-[18px] mb-1">
            Entry Task Status
          </label>
          <select
            id="taskStatus"
            name="taskStatus"
            value={task.taskStatus}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, taskStatus: e.target.value }))
            }
            placeholder="Task Status (on hold, in progress, completed, cancelled)"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          >
            <option value="on hold">On Hold</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors?.taskStatus && (
            <span className="text-red-500">{errors.taskStatus}</span>
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

export default AddTask;
