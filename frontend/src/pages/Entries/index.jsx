import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllEntries, deleteEntryById } from "../../api";
import { Link } from "react-router-dom";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const allEntries = await getAllEntries(axioPrivate);
      !allEntries?.error && setEntries(allEntries);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEntryById(axioPrivate, id);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-16">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Available Entries
      </h1>
        <div className="w-fit mx-auto max-w-[100vw] overflow-scroll no-scrollbar">
          <Link
            to="/entries/add"
            className="bg-blue-700 text-white px-2 py-1 rounded-sm align-middle hover:bg-blue-800"
          >
            Add New Entry
          </Link>
          {entries.length > 0 ? (
            <table className="border border-gray-500 w-fit rounded-sm mt-2">
              <thead>
                <tr className="border border-gray-500">
                  <td className="border border-gray-500 p-2 align-middle"></td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Employee
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Project
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Task
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Timesheet
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Date
                  </td>
                  <td className="border border-gray-500 p-2 align-middle text-xl font-bold text-blue-950">
                    Hours
                  </td>

                  <td></td>
                </tr>
              </thead>
              <tbody>
                {entries &&
                  entries.map((entry, index) => {
                    return (
                      <tr key={entry.id} className="border border-gray-500">
                        <td className="border border-gray-500 p-2 align-middle md:min-w-[100px]">
                          <Link
                            to={`/entries/${entry.id}`}
                            className="text-blue-700 underline font-bold align-middle"
                          >
                            {index + 1}
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {entry.Timesheet?.Employee?.firstName}{" "}
                          {entry.Timesheet?.Employee?.lastName}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {entry.Project?.projectName}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {entry.Task?.taskName}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          On {entry.Timesheet?.date} for{" "}
                          {entry.Timesheet?.hours} hours
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {entry.date}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          {entry.hours}
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          <Link
                            to={`/entries/${entry.id}`}
                            className="text-white bg-blue-700 rounded-sm px-4 py-1 hover:bg-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="border border-gray-500 p-2 align-middle">
                          <button
                            onClick={() => handleDelete(entry.id)}
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
              No entries available
            </p>
          )}
        </div>
    </main>
  );
};

export default Entries;
