import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
} from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextInput from "../../components/TextInput";
import SelectStatus from "../../components/SelectStatus";
import { roles } from "../../constants";
import PhoneInput from "../../components/PhoneInput";
import EmailInput from "../../components/EmailInput";
import CheckboxInput from "../../components/CheckboxInput";

const EmployeeDetail = () => {
  const [errors, setErrors] = useState({});
  const [employee, setEmployee] = useState({});
  const [formError, setFormError] = useState(false);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await getEmployeeById(axioPrivate, id);
      if (response && !response.error) {
        setEmployee(response);
      }
    };
    fetchEmployee();
  }, [axioPrivate, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!employee?.firstName) {
      errors.firstName = "First name is required for this employee";
    }

    if (!employee?.lastName) {
      errors.lastName = "The last name is required for this employee";
    }

    if (!/^(\d{1,3}\s?)?0?\d{2}\s?\d{3}\s?\d{4}$/.test(employee?.phone)) {
      errors.phone = "The phone number is not valid";
    }

    if (!/^[0-9]{2}-[0-9]{6}[a-zA-z]{1}[0-9]{2}$/.test(employee?.nationalId)) {
      errors.nationalId = "The national ID is not valid";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      // otherwise create the employee and redirect
      const response = await updateEmployeeById(axioPrivate, id, {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        nationalId: employee.nationalId,
        phone: employee.phone,
        role: employee.role,
        isActive: employee.isActive,
      });
      if (response) {
        errors.form = "Something went wrong, please try again";
        setErrors(errors);
        setFormError((prev) => !prev);
      } else {
        navigate(-1);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteEmployeeById(axioPrivate, id);
      navigate("/entries/all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="pt-16 w-[100%] mr-4">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Update {employee?.firstName} {employee?.lastName}&#39;s Details
      </h1>
      {formError && setTimeout(() => setFormError(false), 3000) && (
        <p className="bg-red-500 text-white px-4 py-2 rounded absolute top-[15%] right-[5%]">
          {errors.form}
        </p>
      )}
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <TextInput
            label="First Name:"
            name="firstName"
            value={employee?.firstName}
            placeholder="Employee First Name"
            handleChange={(e) =>
              setEmployee(
                (prev) => (prev = { ...prev, firstName: e.target.value })
              )
            }
            error={errors?.firstName}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Last Name:"
            name="lastName"
            value={employee?.lastName}
            placeholder="Last Name"
            handleChange={(e) =>
              setEmployee(
                (prev) => (prev = { ...prev, lastName: e.target.value })
              )
            }
            error={errors?.lastName}
          />
        </p>
        <p className="flex flex-col">
          <PhoneInput
            label="Employee Phone Number:"
            name="phone"
            value={employee?.phone}
            handleChange={(e) =>
              setEmployee((prev) => (prev = { ...prev, phone: e.target.value }))
            }
            placeholder="Employee Phone Number"
            error={errors?.phone}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Employee National ID:"
            name="nationalId"
            value={employee?.nationalId}
            handleChange={(e) =>
              setEmployee(
                (prev) => (prev = { ...prev, nationalId: e.target.value })
              )
            }
            placeholder="Employee National ID"
            error={errors?.nationalId}
          />
        </p>
        <p className="flex flex-col">
          <EmailInput
            label="Employee Email:"
            name="email"
            value={employee?.email}
            handleChange={(e) =>
              setEmployee((prev) => (prev = { ...prev, email: e.target.value }))
            }
            placeholder="Employee Email"
            error={errors?.email}
          />
        </p>
        <p className="flex flex-col">
          <SelectStatus
            label="Employee Role:"
            value={employee?.role}
            handlechange={(e) =>
              setEmployee((prev) => (prev = { ...prev, role: e.target.value }))
            }
            optionValues={roles}
          />
        </p>
        <p className="flex gap-4 mt-4">
          <CheckboxInput
            label="Active:"
            name="isActive"
            value={employee?.isActive}
            checked={employee?.isActive}
            handleClick={() =>
              setEmployee(
                (prev) => (prev = { ...prev, isActive: !prev.isActive })
              )
            }
            error={errors?.isActive}
          />
        </p>
        <div className="flex items-center justify-around mt-4 [w-100%]">
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
      {employee?.timesheets?.length > 0 && (
        <section className="mt-8 w-full md:w-1/2 pr-4 mx-auto">
          <h1 className="py-4 text-center text-blue-950 text-xl font-semibold">
            Timesheets by {employee.firstName}
          </h1>
          <table className="w-[100%]">
            <thead>
              <tr className="border border-gray-500">
                <td className=" py-1 px-2 font-semibold">Date</td>
                <td className=" py-1 px-2 font-semibold">Hours</td>
                <td className=" py-1 px-2 font-semibold">Status</td>
              </tr>
            </thead>
            <tbody>
              {employee.timesheets.map((timesheet) => (
                <tr key={timesheet.id} className="border border-gray-500">
                  <td className=" py-1 px-2">{timesheet.date}</td>
                  <td className=" py-1 px-2">{timesheet.hours}</td>
                  <td className=" py-1 px-2">{timesheet.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to={"/timesheets/all"}
            className="mt-4 block w-fit py-2 px-4 bg-blue-700 hover:to-blue-900 text-white rounded-sm"
          >
            Go To All Timesheets
          </Link>
        </section>
      )}
      {employee?.tasks?.length > 0 && (
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
              {employee.tasks.map((task) => (
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

export default EmployeeDetail;
