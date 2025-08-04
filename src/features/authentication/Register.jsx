import { Form, redirect } from "react-router";
import Button from "../../ui/Button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

const isValidEmail = (email) => emailRegex.test(email);
const isStrongPassword = (password) => strongPasswordRegex.test(password);

function Register() {
  return (
    <div className="mt-18 flex h-full flex-col items-center space-y-14">
      <h1 className="font-[inter] text-2xl font-semibold">
        Create your account
      </h1>
      <Form
        method="POST"
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="space-y-7">
          <div className="flex flex-col">
            <label
              className="mb-3 text-base font-bold text-[#999CA1]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-5 py-3 focus:ring focus:ring-stone-300 focus:outline-none"
              name="username"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base font-bold text-[#999CA1]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-5 py-3 focus:ring focus:ring-stone-300 focus:outline-none"
              name="email"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-base font-bold text-[#999CA1]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-5 py-3 focus:ring focus:ring-stone-300 focus:outline-none"
              name="password"
              type="password"
            />
          </div>
        </div>

        <div className="flex justify-center px-4">
          <Button type="secondary">Register</Button>
        </div>
      </Form>
    </div>
  );
}

//eslint-disable-next-line
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log({ data });

  const errors = {};
  if (!isValidEmail(data.email)) errors.email = "Please enter a correct email";
  if (isStrongPassword(data.password)) errors.password = "Password is weak";

  console.log(errors);

  if (Object.keys(errors).length > 0) return errors;

  return redirect(`/app/login`);
}

export default Register;
