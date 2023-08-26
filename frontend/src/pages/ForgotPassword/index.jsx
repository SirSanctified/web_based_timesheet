import { Form, useActionData, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api";

const ForgotPassword = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  return (
    <section className="w-full h-screen flex flex-col gap-4 items-center justify-center mx-4 md:mx-8">
      <div className="w-[100px] h-[100px] bg-blue-950 text-white text-5xl flex items-center justify-center rounded-full font-black">
        M.
      </div>
      <h1 className="text-3xl font-black">Forgot Password</h1>
      {actionData?.success ? (
        <div className="w-full md:w-2/3 lg:w-1/2">
          <p className="text-center">
            We have sent an email with instructions to {actionData?.email}. If
            you do not see the email, check your spam and junk folders.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 py-2 w-full rounded-sm text-white text-center bg-blue-700 hover:bg-blue-950 transition-all ease-linear duration-500"
          >
            Go To Login
          </button>
        </div>
      ) : (
        <>
          <p className="text-center">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
          <Form method="post" className="w-full md:w-2/3 lg:w-1/2">
            <p className="flex flex-col w-full gap-1">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                required
                className={`rounded-sm border p-2 w-full focus:border-gray-900 focus-visible:outline-none ${
                  actionData?.errors?.email
                    ? "border-red-500"
                    : " border-gray-500"
                }`}
              />
              {actionData?.errors?.email && (
                <span className="text-red-500">{actionData.errors.email}</span>
              )}
            </p>
            <button className="mt-4 py-2 w-full rounded-sm text-white text-center bg-blue-700 hover:bg-blue-950 transition-all ease-linear duration-500">
              Reset Password
            </button>
          </Form>
        </>
      )}
    </section>
  );
};

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const actionData = {
    errors: {},
    success: false,
    email: "",
  };
  const response = await forgotPassword(email);
  if (response.error) {
    actionData.errors.email = response.error;
  }
  if (Object.keys(actionData.errors).length > 0) {
    return actionData;
  }
  actionData.success = true;
  actionData.email = email;
  return actionData;
};

export default ForgotPassword;
