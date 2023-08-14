import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="h-[60px] bg-gray-400 w-full py-4 px-[2rem] flex items-center justify-start ">
      <h1 className="text-blue-950 font-black text-2xl">Timesheet System</h1>
      <ul className="hidden md:flex items-center justify-start gap-[2rem] ml-auto">
        <li className="text-blue-950 font-bold text-lg hover:text-white transition-all">
          <a href="/#">Home</a>
        </li>
        <li className="text-blue-950 font-bold text-lg hover:text-white transition-all">
          <a href="/#">Projects</a>
        </li>
        <li className="text-blue-950 font-bold text-lg hover:text-white transition-all">
          <a href="/#">Tasks</a>
        </li>
        <li>
          {auth ? (
            <button
              className="flex items-center justify-center font-semibold text-white shadow-md bg-blue-700 py-2 px-5 rounded-sm"
              onClick={() => {
                setAuth(null);
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="flex items-center justify-center font-semibold text-white shadow-md bg-blue-700 py-2 px-5 rounded-sm"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
