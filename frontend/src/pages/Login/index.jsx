import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import useAuth from "../../hooks/useAuth";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";

const Login = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!email) {
      errors.email = "Email address cannot be empty";
    }

    if (!password) {
      errors.password = "Password cannot be empty";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password)
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      const response = await loginUser({ email, password });
      if (response?.token && response?.user) {
        setAuth({ token: response.token, user: response.user });
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      } else {
        setErrors({ login: response.error });
      }
    }
  };

  return (
    <main className="lg:w-1/3 lg:mx-auto md:w-2/3 md:mx-auto w-100 mr-4 mt-16 p-4 rounded shadow-lg">
      <h1 className="text-blue-950 text-2xl text-center font-black">Login</h1>
      <p className="text-center my-4 text-lg">
        Fill in the form below to login to your account.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {errors?.login && (
          <span className="text-red-500 mb-2">{errors.login}</span>
        )}
        <EmailInput 
          label="Email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          error={errors?.email}
        />
        <PasswordInput 
          label="Password"
          name="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          error={errors?.password}
        />
        <Link to={'/forgot-password'} className="mt-4 mx-auto text-blue-700 hover:underline">
          Forgot password?
        </Link>
        <button className="bg-blue-700 text-white py-2 px-4 rounded-sm hover:bg-blue-900 transition duration-150 ease-in-out min-w-full md:min-w-[100px] mt-4">
          Login
        </button>
        <p className="my-4 text-center"> 
          Don&#39;t have an account?{" "}
          <Link to="/request-registration" className="text-blue-700 hover:underline">
            Contact Admin
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
