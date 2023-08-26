import { Form, redirect, useActionData } from "react-router-dom";
import { resetPassword } from "../../api";

const ResetPassword = () => {
  const errors = useActionData();
  return (
    <section className="w-full h-screen flex flex-col gap-4 items-center justify-center mx-4 md:mx-8">
      <div className="w-[100px] h-[100px] bg-blue-950 text-white text-5xl flex items-center justify-center rounded-full font-black">
        M.
      </div>
      <h1 className="text-3xl font-black">Reset Password</h1>
      <p className="text-center">
        Enter your new password to complete the process.
      </p>
      <Form method="post" className="w-full md:w-2/3 lg:w-1/2">
        <p className="flex flex-col w-full gap-1">
          <label htmlFor="email">New Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your new password"
            required
            className={`rounded-sm border p-2 w-full focus:border-gray-900 focus-visible:outline-none ${
              errors?.password ? "border-red-500" : " border-gray-500"
            }`}
          />
          {errors?.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </p>
        <p className="flex flex-col w-full gap-1">
          <label htmlFor="confirmPassword">Confirm Your Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            className={`rounded-sm border p-2 w-full focus:border-gray-900 focus-visible:outline-none ${
              errors?.confirmPassword ? "border-red-500" : " border-gray-500"
            }`}
          />
          {errors?.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )}
        </p>
        <button className="mt-4 py-2 w-full rounded-sm text-white text-center bg-blue-700 hover:bg-blue-950 transition-all ease-linear duration-500">
          Reset Password
        </button>
        {errors?.form && (
            <span className="text-red-500">{errors.form}</span>
          ) }
      </Form>
    </section>
  );
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const password1 = formData.get("password");
  const password2 = formData.get("confirmPassword");
  const { id, token } = params;
  const errors = {};

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password1)
  ) {
    errors.password =
      "Password must contain at least 1 digit, 1 capital letter, 1 small letter, 1 special character and should be at least 8 characters long.";
  }
  if (password1 !== password2) {
    errors.confirmPassword = "Password do not match";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const response = await resetPassword(password1, token, id);
  if (response.error) {
    errors.form = response.error;
    return errors;
  }
  return redirect("/login");
};

export default ResetPassword;
