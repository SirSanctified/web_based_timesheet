import useAuth from "../../hooks/useAuth";
import AdminDashboard from "../../pages/AdminDashboard";
import ApproverDashboard from "../../pages/ApproverDashboard";
import EmployeeDashboard from "../../pages/EmployeeDashboard";

const Dashboard = () => {
  const {auth } = useAuth();
  console.log(auth?.user.role);
  return (
    <>
      {auth?.user.role === "admin"
        ? <AdminDashboard />
        : auth?.user.role === "approver"
        ? <ApproverDashboard />
        : <EmployeeDashboard />}
    </>
  );
};

export default Dashboard;