import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllRequests, deleteRequestById } from "../../api";
import { Link } from "react-router-dom";

const RegistrationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const allRequests = await getAllRequests(axioPrivate);
      allRequests?.error
        ? setError("Something went wrong, please try again.")
        : setRequests(allRequests);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRequestById(axioPrivate, id);
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16 mx-8">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Available Requests
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="w-fit mx-auto max-w-[100vw] overflow-scroll">
          {requests.length > 0 ? (
            <table className="border border-gray-500 w-fit rounded-sm mt-2">
              <thead>
                <tr className="border border-gray-500">
                  <td className="border border-gray-500 p-2 align-middle"></td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Name
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    National Id
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Phone Number
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Email
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests.map((request, index) => {
                    return (
                      <tr key={request.id} className="border border-gray-500">
                        <td className="border border-gray-500 p-2 align-middle md:min-w-[100px]">
                          <Link
                            to={`/requests/${request.id}`}
                            className="text-blue-700 underline font-bold align-middle"
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {request.firstName} {request.lastName}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {request.nationalId}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {request.phone}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {request.email}
                        </td>

                        <td className="border border-gray-500 p-2 align-middle">
                          <Link
                            to={`/requests/${request.id}`}
                            className="text-white bg-blue-700 rounded-sm px-4 py-1 hover:bg-blue-900"
                          >
                            View
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="text-white bg-red-500 rounded-sm px-4 py-1 hover:bg-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-blue-950 text-xl font-bold mt-4">
              No requests available
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default RegistrationRequests;
