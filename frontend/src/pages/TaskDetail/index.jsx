import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllProjects,
  updateTaskById,
  getTaskById,
  getAllEmployees,
  deleteTaskById,
} from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TaskDetail = () => {
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskEmployees, setTaskEmployees] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [taskStartDate, setTaskStartDate] = useState(Date.now());
  const [taskEndDate, setTaskEndDate] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("on hold");
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const allEmployees = await getAllEmployees(axioPrivate);
      const allProjects = await getAllProjects(axioPrivate);
      const task = await getTaskById(axioPrivate, id);
      setEmployees(allEmployees);
      setProjects(allProjects);
      setTaskEmployees(task.employees);
      setProjectId(task.projectId);
      setTaskStartDate(task.taskStartDate);
      setTaskEndDate(task.taskEndDate);
      setTaskName(task.taskName);
      setTaskDescription(task.taskDescription);
      setTaskStatus(task.taskStatus);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!projectId) {
      errors.projectId = "The task must belong to a project";
    }

    if (!taskStartDate) {
      errors.taskStartDate = "The start date is required for this task";
    }

    if (!taskName) {
      errors.taskName = "The name is required for this task";
    }

    if (
      !["on hold", "in progress", "completed", "cancelled"].includes(taskStatus)
    ) {
      errors.taskStatus =
        "The status must be one of the following: in progress, on hold, completed, or cancelled";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      // otherwise create the task and redirect
      const response = await updateTaskById(axioPrivate, id, {
        employees: taskEmployees,
        taskName,
        taskDescription,
        taskStartDate,
        taskEndDate: taskEndDate || null,
        taskStatus,
        projectId: projectId || null,
      });
      if (response?.error) {
        errors.form = "Something went wrong, please try again";
      } else {
        navigate(-1);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteTaskById(axioPrivate, id);
      navigate("/tasks/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="px-8 pt-16">
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
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
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
          <select
            name="taskEmployees"
            value={taskEmployees}
            onChange={(e) => setTaskEmployees(e.target.value)}
            id="taskEmployees"
            multiple
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            <option value="" className="px-2 py-2 border border-gray-500">
              Select employees
            </option>
            {employees &&
              !employees.error &&
              Array.from(employees)?.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                  className="px-2 py-2 border border-gray-500"
                >
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
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
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
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
          <input
            type="text"
            id="taskDescription"
            name="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
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
            value={taskStartDate}
            onChange={(e) => setTaskStartDate(e.target.value)}
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
            value={taskEndDate}
            onChange={(e) => setTaskEndDate(e.target.value)}
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
          <input
            type="text"
            id="taskStatus"
            name="taskStatus"
            value={taskStatus}
            onChange={(e) => setTaskStatus(parseInt(e.target.value))}
            placeholder="Task Status (on hold, in progress, completed, cancelled)"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.taskStatus && (
            <span className="text-red-500">{errors.taskStatus}</span>
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

export default TaskDetail;
