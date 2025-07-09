import { useLocation, Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, signOut }) {
  const { pathname } = useLocation();

  return (
    <nav className="w-full h-16 border-b border-gray-700 px-4 sm:px-8 py-3 bg-[#121417] flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-white text-xl pb-[4px]">⏳</div>
        <div className="font-bold text-lg text-white">TaskMaster</div>
      </div>

      <div className="flex items-center gap-4">
        {/* {isAuthenticated ? ( */
        /*jsut for testig and navigation easly while styling*/}
        {!isAuthenticated ? (
          <>
            <div className="navigator">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Dashboard
              </Link>
              <Link
                to="/tasks"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Tasks
              </Link>
            </div>
            <button
              onClick={signOut}
              className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              Sign out
            </button>
          </>
        ) : pathname === "/signin" ? (
          <Link
            to="/signup"
            className="bg-[#1A80E5] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#176fc2] transition-colors"
          >
            Sign up
          </Link>
        ) : pathname === "/signup" ? (
          <Link
            to="/signin"
            className="bg-[#1A80E5] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#176fc2] transition-colors"
          >
            Sign in
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
