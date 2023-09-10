import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { insertRequest } from "../../api";
import EmailInput from "../../components/EmailInput";
import TextInput from "../../components/TextInput";
import PhoneInput from "../../components/PhoneInput";

const RequestRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!email) {
      errors.email = "Email address cannot be empty";
    }

    if (!firstName) {
      errors.firstName = "First Name cannot be empty";
    } 

    if (!lastName) {
      errors.lastName = "Last Name cannot be empty";
    }

    if (!nationalId) {
      errors.nationalId = "National ID cannot be empty";
    } else if (!/^\d{2}-\d{6}[A-Za-z]\d{2}$/.test(nationalId)) {
      errors.nationalId = "National ID is invalid";
    }

    if (!phone) {
      errors.phone = "Phone number cannot be empty";
    } else if (!/^(\d{1,3}\s?)?0?\d{2}\s?\d{3}\s?\d{4}$/.test(phone)) {
      errors.phone = "Phone number is invalid";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      const response = await insertRequest({ email, firstName, lastName, nationalId, phone });
      if (!response?.error) {
        setEmail("");
        setLastName("");
        setFirstName("");
        setNationalId("");
        setPhone("");
        setErrors({});
        navigate(from, { replace: true });
      } else {
        setErrors({ login: response.error });
      }
    }
  };

  return (
    <main className="mx-8 lg:w-1/3 lg:mx-auto md:w-2/3 md:mx-auto w-100 mt-16 p-4 rounded shadow-lg">
      <h1 className="text-blue-950 text-2xl text-center font-black">Request Registration</h1>
      <p className="text-center my-4 text-lg">
        Fill in the form below with your details to request registration.
      </p>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
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
            label="Phone Number:"
            name="phone"
            value={phone}
            handleChange={(e) => setPhone(e.target.value)}
            placeholder="Employee Phone Number"
            error={errors?.phone}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="National ID:"
            name="nationalId"
            value={nationalId}
            handleChange={(e) => setNationalId(e.target.value)}
            placeholder="Employee National ID"
            error={errors?.nationalId}
          />
        </p>
        <p className="flex flex-col">
          <EmailInput
            label="Email Address:"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder="Employee Email Address"
            error={errors?.email}
          />
        </p>
        <button className="bg-blue-700 text-white py-2 px-4 rounded-sm hover:bg-blue-900 transition duration-150 ease-in-out min-w-full md:min-w-[100px] mt-4">
          Send
        </button>
        
      </form>
    </main>
  );
};

export default RequestRegistration;
