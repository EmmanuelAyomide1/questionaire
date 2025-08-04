import { Form } from "react-router";
import Button from "../../ui/Button";

function Login() {
  return (
    <div className="mt-18 flex h-full flex-col items-center space-y-14">
      <h1 className="font-[inter] text-2xl font-semibold">
        Log into your account
      </h1>
      <Form className="flex h-full w-full flex-col justify-between">
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
              id="username"
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
              id="password"
              type="text"
            />
          </div>
        </div>

        <div className="flex justify-center px-4">
          <Button type="primary">Login</Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
