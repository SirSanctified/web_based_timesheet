import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { getAllEmployees, getTimesheetById, updateTimesheetById } from "../../api";

const EditTimesheet = () => {
  const errors = useActionData();
  const { employees, timesheet } = useLoaderData();
  const { employeeId } = useParams();
  const timesheetOwner =
    typeof employees === "object"
      ? employees.find((employee) => employee.id === employeeId)[0]
      : null;
  return (
    <main className="px-8 pt-16">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Create New Timesheet
      </h1>
      <Form method="POST" className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <label htmlFor="employeeId" className="text-[18px] mb-1">
            Timesheet For:
          </label>
          <select
            name="employeeId"
            id="employeeId"
            className="mb-1 px-2 py-2 border border-gray-500 rounded-sm"
          >
            {timesheetOwner && (
              <option
                value={timesheetOwner.id}
                className="px-2 py-2 border border-gray-500"
              >
                {timesheetOwner.firstName} {timesheetOwner.lastName}
              </option>
            )}
            {employees &&
              typeof employees === "object" &&
              employees?.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                  className="px-2 py-2 border border-gray-500"
                >
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
          {errors?.employeeId && (
            <span className="text-red-500">{errors.employeeId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="date" className="text-[18px] mb-1">
            Timesheet Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={timesheet?.date}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.date && <span className="text-red-500">{errors.date}</span>}
        </p>
        <p className="flex flex-col">
          <label htmlFor="hours" className="text-[18px] mb-1">
            Timesheet Hours
          </label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={timesheet?.hours}
            placeholder="Timesheet hours"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.hours && (
            <span className="text-red-500">{errors.hours}</span>
          )}
        </p>
        <button
          type="submit"
          className="px-4 py-2 mt-4 bg-blue-700 rounded-sm min-w-[100px]"
        >
          Save
        </button>
      </Form>
    </main>
  );
};

export async function loader({ params }) {
  const timesheet = await getTimesheetById(params.id);
  const employees = await getAllEmployees();
  return { timesheet, employees };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const employeeId = formData.get("employeeId");
  const date = formData.get("date");
  const hours = parseInt(formData.get("hours"));

  const errors = {};

  // validate the fields
  if (!employeeId) {
    errors.employeeId = "The timesheet must belong to an employee";
  }

  if (!date) {
    errors.date = "The date is required for this timesheet";
  }

  if (!hours) {
    errors.hours = "The hours are required for this timesheet";
  } else if (typeof hours !== "number") {
    errors.hours = "Hours should be a number";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }
  // otherwise create the timesheet and redirect
  await updateTimesheetById(params.id, { employeeId, date, hours });

  return redirect("/dashboard");
}

export default EditTimesheet;
