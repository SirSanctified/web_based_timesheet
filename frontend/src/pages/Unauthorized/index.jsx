import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <main className="lg:w-1/3 lg:mx-auto md:w-2/3 md:mx-auto w-100 mt-16 p-4 mr-4 flex flex-col items-center rounded shadow-lg">
      <h1 className="text-blue-950 text-2xl text-center font-black">
        Unauthorized
      </h1>
      <p className="text-center my-4 text-lg">
        You are not authorized to view this page.
      </p>
      <button
        onClick={goBack}
        className="bg-blue-700 text-white py-2 px-4 mx-auto rounded-sm hover:bg-blue-900 transition duration-150 ease-in-out min-w-[100%] mt-4"
      >
        Go Back
      </button>
    </main>
  );
};

export default Unauthorized;
