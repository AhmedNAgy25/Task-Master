import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, number, and symbol."
      );
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword,
      };

      const response = await apiService.signup(signupData);

      if (response && response.data && response.data.user) {
        // Signup successful, redirect to sign-in page
        navigate("/signin", { state: { signupSuccess: true } });
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#121417] px-4">
      <section className="w-full max-w-md bg-[#181b20] rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-white mb-6 text-center font-inter">
          Create your account
        </h2>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#9EABB8]"
            >
              name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="rounded-lg p-3 bg-[#23272f] text-[#9eabb8] focus:outline-none focus:ring-2 focus:ring-[#1a80e5]"
              placeholder="Enter your name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="text-xs text-[#9EABB8] mt-1">
              Password must be at least 8 characters with uppercase, lowercase,
              number, and symbol
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-[#9EABB8]"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="rounded-lg p-3 bg-[#23272f] text-[#9eabb8] focus:outline-none focus:ring-2 focus:ring-[#1a80e5]"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          <button
            className="w-full py-3 mt-2 bg-[#1a80e5] text-white rounded-xl font-semibold hover:bg-[#176fc2] transition-colors disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <div className="mt-6 text-center text-[#9EABB8] text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="underline text-[#1980E5] hover:text-[#176fc2]"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
