import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllEntries, deleteEntryById, getAllTimesheets } from "../../api";
import { Link } from "react-router-dom";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const axioPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      const allEntries = await getAllEntries(axioPrivate);
      const allTimesheets = await getAllTimesheets(axioPrivate);
      allEntries?.error ? setError(allEntries.error) : setEntries(allEntries);
      allTimesheets?.error
        ? setError(allTimesheets.error)
        : setTimesheets(allTimesheets);
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
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="w-fit mx-auto max-w-[100vw] overflow-scroll">
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
                  const timesheet = timesheets?.find(
                    (emp) => emp.id === entry.timesheetId
                  );
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
                        {timesheet.date} for {timesheet.hours}
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
          </table> ) : (
            <p className="text-center text-blue-950 text-xl font-bold mt-4">
              No entries available
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Entries;
