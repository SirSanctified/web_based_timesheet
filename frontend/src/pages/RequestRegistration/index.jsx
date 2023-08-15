import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { insertRequest } from "../../api";

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
    <main className="mx-8 lg:w-1/2 lg:mx-auto md:w-2/3 md:mx-auto w-100 mt-16 p-4 bg-slate-300 rounded shadow-md">
      <h1 className="text-blue-950 text-2xl text-center font-black">Request Registration</h1>
      <p className="text-center my-4 text-lg">
        Fill in the form below with your details to request registration.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {errors?.login && (
          <span className="text-red-500 mb-2">{errors.login}</span>
        )}
        <label htmlFor="firstName" className="mt-4">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="off"
          placeholder="First Name"
          className="px-2 py-2 border border-gray-500 rounded-sm mb-1"
        />
        {errors?.firstName && (
          <span className="text-red-500">{errors.firstName}</span>
        )}
        <label htmlFor="lastName" className="mt-4">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="off"
          placeholder="Last Name"
          className="px-2 py-2 border border-gray-500 rounded-sm mb-1"
        />
        {errors?.lastName && (
          <span className="text-red-500">{errors.lastName}</span>
        )}
        <label htmlFor="email" className="mt-4">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="px-2 py-2 border border-gray-500 rounded-sm mb-1"
        />
        {errors?.email && <span className="text-red-500">{errors.email}</span>}
        <label htmlFor="nationalId" className="mt-4">
          National ID
        </label>
        <input
          type="text"
          id="nationalId"
          name="nationalId"
          value={nationalId}
          autoComplete="off"
          onChange={(e) => setNationalId(e.target.value)}
          placeholder="National ID"
          className="px-2 py-2 border border-gray-500 rounded-sm mb-1"
        />
        {errors?.nationalId && (
          <span className="text-red-500">{errors.nationalId}</span>
        )}
        <label htmlFor="phone" className="mt-4">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          autoComplete="off"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="px-2 py-2 border border-gray-500 rounded-sm mb-1"
        />
        {errors?.phone && <span className="text-red-500">{errors.phone}</span>}
        <button className="bg-blue-700 text-white py-2 px-4 rounded-sm hover:bg-blue-900 transition duration-150 ease-in-out min-w-full md:min-w-[100px] mt-4">
          Send
        </button>
        
      </form>
    </main>
  );
};

export default RequestRegistration;
