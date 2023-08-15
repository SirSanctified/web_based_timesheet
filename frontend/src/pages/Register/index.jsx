import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("general");
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState(false);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // validate the fields
    if (!firstName) {
      errors.firstName = "First name is required for this employee";
    }

    if (!lastName) {
      errors.lastName = "The last name is required for this employee";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password)) {
      errors.password = "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    if (!/^(\d{1,3}\s?)?0?\d{2}\s?\d{3}\s?\d{4}$/.test(phone)) {
      errors.phone = "The phone number is not valid";
    }

    if (!/^[0-9]{2}-[0-9]{6}[a-zA-z]{1}[0-9]{2}$/.test(nationalId)) {
      errors.nationalId = "The national ID is not valid";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      // otherwise create the employee and redirect
      const response = await registerUser(axioPrivate, {
        firstName,
        lastName,
        phone,
        nationalId,
        email,
        password,
        role,
        isActive,
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

  return (
    <main className=" w-[100%] pt-16">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Add New Employee
      </h1>
      {formError && setTimeout(() => setFormError(false), 3000) && (
        <p className="bg-red-500 text-white px-4 py-2 rounded absolute top-[15%] right-[5%]">
          {errors.form}
        </p>
      )}
      <form onSubmit={handleSubmit} className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <label htmlFor="firstName" className="text-[18px] mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="Project Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.firstName && (
            <span className="text-red-500">{errors.firstName}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="lastName" className="text-[18px] mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.lastName && (
            <span className="text-red-500">{errors.lastName}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="phone" className="text-[18px] mb-1">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Employee Phone Number"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.phone && (
            <span className="text-red-500">{errors.phone}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="nationalId" className="text-[18px] mb-1">
            Employee National ID:
          </label>
          <input
            type="text"
            id="nationalId"
            name="nationalId"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="Employee National ID"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.nationalId && (
            <span className="text-red-500">{errors.nationalId}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="email" className="text-[18px] mb-1">
            Employee Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Employee Email"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.email && (
            <span className="text-red-500">{errors.email}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="password" className="text-[18px] mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
          {errors?.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </p>
        <p className="flex flex-col">
          <label htmlFor="role" className="text-[18px] mb-1">
            Role:
          </label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          >
            <option value="admin">Admin</option>
            <option value="approver">Approver</option>
            <option value="general">General</option>
          </select>
          </p>
        <p className="flex gap-4 mt-4">
          <label htmlFor="isActive" className="text-[18px] mb-1">
            Active:
          </label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            value={isActive}
            checked={isActive}
            onClick={() => setIsActive(!isActive)}
            className="w-8 h-8 border border-gray-500 rounded-sm"
          />
          {errors?.isActive && (
            <span className="text-red-500">{errors.isActive}</span>
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

export default Register;
