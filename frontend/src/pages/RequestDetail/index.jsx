import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteRequestById, getRequestById } from "../../api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmailInput from "../../components/EmailInput";
import TextInput from "../../components/TextInput";
import PhoneInput from "../../components/PhoneInput";

const RequestDetail = () => {
  const [request, setRequest] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    email: "",
    phone: "",
  })
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await getRequestById(axioPrivate, id);
      if (response && !response.error) {
        setRequest(response);
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
      <form className="md:w-[50%] w-full mx-auto">
        <p className="flex flex-col">
          <TextInput
            label="First Name:"
            name="firstName"
            value={request.firstName}
            placeholder="Employee First Name"
            handleChange={(e) => setRequest((prev) => ({...prev, firstName: e.target.value}))}
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Last Name:"
            name="lastName"
            value={request.lastName}
            placeholder="Employee Last Name"
            handleChange={(e) => setRequest((prev) => ({...prev, lastName: e.target.value}))}
          />
        </p>
        <p className="flex flex-col">
          <PhoneInput
            label="Employee Phone Number:"
            name="phone"
            value={request.phone}
            handleChange={(e) => setRequest((prev) => ({...prev, phone: e.target.value}))}
            placeholder="Employee Phone Number"
          />
        </p>
        <p className="flex flex-col">
          <TextInput
            label="Employee National ID:"
            name="nationalId"
            value={request.nationalId}
            handleChange={(e) => setRequest((prev) => ({...prev, nationalId: e.target.value}))}
            placeholder="Employee National ID"
          />
        </p>
        <p className="flex flex-col">
          <EmailInput
            label="Employee Email Address:"
            name="email"
            value={request.email}
            handleChange={(e) => setRequest((prev) => ({...prev, email:e.target.value}))}
            placeholder="Employee Email Address"
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
