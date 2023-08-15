import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllEmployees, deleteEmployeeById } from "../../api";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const allEmployees = await getAllEmployees(axioPrivate);
      allEmployees?.error
        ? setError("Something went wrong, please try again.")
        : setEmployees(allEmployees);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployeeById(axioPrivate, id);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Available Employees
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="w-fit mx-auto max-w-[100vw] overflow-scroll">
          <Link
            to="/register"
            className="bg-blue-700 text-white px-4 py-2 rounded-sm align-middle hover:bg-blue-800"
          >
            Add New Employee
          </Link>
          {employees.length > 0 ? (
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
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Active
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Role
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {employees && 
                  employees?.map((employee, index) => {
                    return (
                      <tr key={employee.id} className="border border-gray-500">
                        <td className="border border-gray-500 p-2 align-middle md:min-w-[100px]">
                          <Link
                            to={`/employees/${employee.id}`}
                            className="text-blue-700 underline font-bold align-middle"
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {employee.nationalId}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {employee.phone}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {employee.email}
                        </td>
                        <td className="p-2 align-middle flex items-center justify-center">
                          {employee.isActive ? <MdCheck className="text-green-700 text-xl font-bold" /> : <FaTimes className="text-red-700 text-xl font-bold" />}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                        {employee.role}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          <Link
                            to={`/employees/${employee.id}`}
                            className="text-white bg-blue-700 rounded-sm px-2 py-1 hover:bg-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="text-white bg-red-500 rounded-sm px-2 py-1 hover:bg-red-900"
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
              No employees available
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Employees;
