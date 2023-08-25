import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { approveTimesheet, getTimesheetById } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const ApproveTimesheet = () => {
  const [timesheet, setTimesheet] = useState();
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const axioPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const receivedTimesheet = await getTimesheetById(axioPrivate, id);
      if (receivedTimesheet.error) {
        setError(receivedTimesheet.error);
      } else {
        setTimesheet(receivedTimesheet);
      }
    })();
  }, []);

  const handleApprove = async (e) => {
    e.preventDefault();
    const updatedTimesheet = await approveTimesheet(axioPrivate, id, {
      status: "approved",
    });
    if (updatedTimesheet?.error) {
      setError(updatedTimesheet.error);
      setUpdated(false);
    } else {
      setUpdated(true);
      setTimeout(() => navigate(-1), 1000);
    }
  };

  const handleReject = async () => {
    const rejectedTimesheet = await approveTimesheet(axioPrivate, id, {
      status: "rejected",
    });
    if (rejectedTimesheet?.error) {
      setUpdated(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="mt-16 w-[100%]">
      <h1 className="text-blue-950 text-2xl font-black text-center mb-4">
        Approve {timesheet?.Employee?.firstName}&#39;s Timesheet
      </h1>
      <p className="text-blue-950 font-normal text-center mb-4 w-100 md:w-1/2 mx-auto">
        Note that the timesheet is only valid if it&#39;s number of hours are
        equal to the total of it&#39;s associated entries.
      </p>
      {error && setTimeout(() => setError(""), 3000) && (
        <p className="text-text bg-red-500 px-4 py-1 rounded absolute top-8 rigt-4 text-center">
          {error}
        </p>
      )}
      <form onSubmit={handleApprove} className="w-100 md:w-1/2 mx-auto">
        {updated && setTimeout(() => setUpdated(false), 1000) && (
          <p className="text-white bg-green-500 px-4 py-2 rounded z-20 text-center absolute top-[15%] right-[5%]">
            Timesheet updated successfully!
          </p>
        )}
        <div className="flex flex-col items-start w-[100%]">
          <label htmlFor="employeeId">Employee</label>
          <input
            name="employeeId"
            id="employeeId"
            value={`${timesheet?.Employee?.firstName} ${timesheet?.Employee?.firstName}`}
            readOnly
            className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
          ></input>
        </div>
        <div className="flex flex-col items-start w-[100%]">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={timesheet?.date}
            readOnly
            className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
          />
        </div>
        <div className="flex flex-col items-start w-[100%]">
          <label htmlFor="hours">Hours</label>
          <input
            type="number"
            name="hours"
            id="hours"
            value={timesheet?.hours}
            readOnly
            className="mb-4 border border-gray-500 rounded-sm px-4 py-2 w-[100%]"
          />
        </div>
        <div className="flex items-center justify-around [w-100%]">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-900 text-white rounded-sm px-4 py-2"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => handleReject()}
            className="bg-red-500 hover:bg-red-900 text-white rounded-sm px-4 py-2"
          >
            Reject
          </button>
        </div>
      </form>
      {timesheet?.Entries?.length > 0 && (
        <section className="mt-4 w-full md:w-1/2 pr-4 mx-auto">
          <h1 className="py-4 text-center text-blue-950 text-xl font-semibold">
            Timesheet Entries
          </h1>
          <table className="w-[100%]">
            <thead>
              <tr className="border border-gray-500">
                <td className=" py-1 px-2 font-semibold">Date</td>
                <td className=" py-1 px-2 font-semibold">Hours</td>
                <td className=" py-1 px-2 font-semibold">Task</td>
                <td className=" py-1 px-2 font-semibold">Project</td>
              </tr>
            </thead>
            <tbody>
              {timesheet.Entries.map((entry) => (
                <tr key={entry.id} className="border border-gray-500">
                  <td className=" py-1 px-2">{entry.date}</td>
                  <td className=" py-1 px-2">{entry.hours}</td>
                  <td className=" py-1 px-2">{entry?.Task?.taskName}</td>
                  <td className=" py-1 px-2">{entry?.Project?.projectName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
};

export default ApproveTimesheet;
