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
import EditTimesheet, {
  action as editTimesheetAction,
  loader as editTimesheetLoader,
} from "./pages/EditTimesheet";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Timesheets from "./pages/Timesheets";

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
          <Route
            path="timesheets/edit/:id"
            element={<EditTimesheet />}
            action={editTimesheetAction}
            loader={editTimesheetLoader}
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "approver"]} />}>
          <Route path="timesheets/all" element={<Timesheets />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
