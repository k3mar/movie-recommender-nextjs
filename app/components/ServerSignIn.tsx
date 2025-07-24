"use server";
import { login, signup } from "@/signin/actions";

const ServerSignIn = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-sm rounded-2xl border border-indigo-400 p-6 shadow-xl shadow-indigo-500/30 bg-blue-600 text-white">
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 rounded-lg bg-blue-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 rounded-lg bg-blue-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              formAction={login}
              className="w-1/2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-transform transform hover:scale-105 active:scale-95"
            >
              Log in
            </button>
            <button
              type="submit"
              formAction={signup}
              className="w-1/2 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-transform transform hover:scale-105 active:scale-95"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ServerSignIn;
