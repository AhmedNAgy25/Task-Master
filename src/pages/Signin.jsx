import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#121417] px-4">
      <section className="w-full max-w-md bg-[#181b20] rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-white mb-6 text-center font-inter">
          Welcome back
        </h2>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#9EABB8]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="rounded-lg p-3 bg-[#23272f] text-[#9eabb8] focus:outline-none focus:ring-2 focus:ring-[#1a80e5]"
              placeholder="Enter your email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#9EABB8]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="rounded-lg p-3 bg-[#23272f] text-[#9eabb8] focus:outline-none focus:ring-2 focus:ring-[#1a80e5]"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          <button
            className="w-full py-3 mt-2 bg-[#1a80e5] text-white rounded-xl font-semibold hover:bg-[#176fc2] transition-colors"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center text-[#9EABB8] text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline text-[#1980E5] hover:text-[#176fc2]"
          >
            Sign up
          </Link>
        </div>
      </section>
    </main>
  );
}
