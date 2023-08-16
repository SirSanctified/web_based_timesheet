import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteRequestById, getRequestById } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const RequestDetail = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await getRequestById(axioPrivate, id);
      if (response && !response.error) {
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setNationalId(response.nationalId);
        setEmail(response.email);
        setPhone(response.phone);
      }
    };
    fetchRequest();
  }, [axioPrivate, id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteRequestById(axioPrivate, id);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mr-4 w-[100%] pt-16">
      <h1 className="text-xl text-blue-950 text-center font-black mb-4">
        Employee Registration Request
      </h1>
      <form onSubmit={() => navigate("/registration-requests/all")} className="md:w-[50%] w-full mx-auto">
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
            readOnly
            onChange={(e) => setFirstName(e.target.value)}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="lastName" className="text-[18px] mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            readOnly
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="phone" className="text-[18px] mb-1">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            readOnly
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Employee Phone Number"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="nationalId" className="text-[18px] mb-1">
            Employee National ID:
          </label>
          <input
            type="text"
            id="nationalId"
            name="nationalId"
            readOnly
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            placeholder="Employee National ID"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="email" className="text-[18px] mb-1">
            Employee Email
          </label>
          <input
            type="email"
            id="email"
            readOnly
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Employee Email"
            className="px-2 py-1 border border-gray-500 rounded-sm text-[16px]"
          />
        </p>
        <div className="flex mt-4 items-center justify-around [w-100%]">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-900 text-white rounded-sm px-4 py-2"
            >
              Go Back
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

export default RequestDetail;
