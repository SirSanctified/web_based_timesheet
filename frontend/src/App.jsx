import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddTimesheet from "./pages/AddTimesheet";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Timesheets from "./pages/Timesheets";
import TimesheetDetail from "./pages/TimesheetDetail";
import Entries from "./pages/Entries";
import AddEntry from "./pages/AddEntry";
import EntryDetail from "./pages/EntryDetail";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import ProjectDetail from "./pages/ProjectDetail";
import PersistLogin from "./components/PersistLogin";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import Employees from "./pages/Employees";
import Register from "./pages/Register";
import EmployeeDetail from "./pages/EmployeeDetail";
import ApproveTimesheet from "./pages/ApproveTimesheet";
import RequestRegistration from "./pages/RequestRegistration";
import RegistrationRequests from "./pages/RegistrationRequests";
import RequestDetail from "./pages/RequestDetail";
import Dashboard from "./components/Dashboard";
import ForgotPassword, {
  action as forgotPasswordAction,
} from "./pages/ForgotPassword";
import ResetPassword, {
  action as resetPasswordAction,
} from "./pages/ResetPassword";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
          action={forgotPasswordAction}
        />
        <Route
          path="reset-password/:token/:id"
          element={<ResetPassword />}
          action={resetPasswordAction}
        />
        <Route path="request-registration" element={<RequestRegistration />} />
        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth allowedRoles={["admin", "approver", "general"]} />
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="timesheets/add" element={<AddTimesheet />} />
            <Route path="timesheets/:id" element={<TimesheetDetail />} />
            <Route path="entries/add" element={<AddEntry />} />
            <Route path="entries/:id" element={<EntryDetail />} />
            <Route path="tasks/:id" element={<TaskDetail />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin", "approver"]} />}>
            <Route path="timesheets/all" element={<Timesheets />} />
            <Route
              path="timesheets/approve/:id"
              element={<ApproveTimesheet />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="entries/all" element={<Entries />} />
            <Route path="projects/all" element={<Projects />} />
            <Route path="projects/add" element={<AddProject />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="tasks/all" element={<Tasks />} />
            <Route path="tasks/add" element={<AddTask />} />
            <Route path="employees/all" element={<Employees />} />
            <Route path="register" element={<Register />} />
            <Route path="employees/:id" element={<EmployeeDetail />} />
            <Route
              path="registration-requests/all"
              element={<RegistrationRequests />}
            />
            <Route path="requests/:id" element={<RequestDetail />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
