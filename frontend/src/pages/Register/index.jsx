import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextInput from "../../components/TextInput";
import PhoneInput from "../../components/PhoneInput";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import SelectStatus from "../../components/SelectStatus";
import CheckboxInput from "../../components/CheckboxInput";
import { roles } from "../../constants";

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

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password)
    ) {
      errors.password =
        "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
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
          <TextInput
            label="First Name:"
            name="firstName"
            value={firstName}
            placeholder="Employee First Name"
            handleChange={(e) => setFirstName(e.target.value)}
            error={errors?.firstName}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Last Name:"
            name="lastName"
            value={lastName}
            placeholder="Employee Last Name"
            handleChange={(e) => setLastName(e.target.value)}
            error={errors?.lastName}
          />
        </p>
        <p className="flex flex-col">
          <PhoneInput
            label="Employee Phone Number:"
            name="phone"
            value={phone}
            handleChange={(e) => setPhone(e.target.value)}
            placeholder="Employee Phone Number"
            error={errors?.phone}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Employee National ID:"
            name="nationalId"
            value={nationalId}
            handleChange={(e) => setNationalId(e.target.value)}
            placeholder="Employee National ID"
            error={errors?.nationalId}
          />
        </p>
        <p className="flex flex-col">
          <EmailInput
            label="Employee Email Address:"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder="Employee Email Address"
            error={errors?.email}
          />
        </p>
        <p className="flex flex-col">
          <PasswordInput
            label="Password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            error={errors?.password}
          />
        </p>
        <p className="flex flex-col">
          <SelectStatus
            label="Role:"
            name="role"
            value={role}
            handlechange={(e) => setRole(e.target.value)}
            optionValues={roles}
          />
        </p>
        <p className="flex gap-4 mt-4">
          <CheckboxInput
            label="Active"
            name="isActive"
            value={isActive}
            checked={isActive}
            handleClick={() => setIsActive(!isActive)}
            error={errors?.isActive}
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

export default Register;
