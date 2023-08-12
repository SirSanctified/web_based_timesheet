import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddTimesheet from "./pages/AddTimesheet";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Timesheets from "./pages/Timesheets";
import TimesheetDetail from "./pages/TimesheetDetail";
import Entries from "./pages/Entries";
import AddEntry from "./pages/AddEntry";
import EntryDetail from "./pages/EntryDetail";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route
          element={
            <RequireAuth allowedRoles={["admin", "approver", "general"]} />
          }
        >
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="timesheets/add" element={<AddTimesheet />} />
          <Route path="timesheets/:id" element={<TimesheetDetail />} />
          <Route path="entries/add" element={<AddEntry />} />
          <Route path="entries/:id" element={<EntryDetail />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "approver"]} />}>
          <Route path="timesheets/all" element={<Timesheets />} />
          <Route path="entries/all" element={<Entries />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
