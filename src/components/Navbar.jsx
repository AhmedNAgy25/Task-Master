import { useLocation, Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, signOut }) {
  const { pathname } = useLocation();

  return (
    <nav className="w-full h-16 border-b border-[#23272f] px-4 md:px-10 py-3 bg-[#121417] flex justify-between items-center">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-white text-xl">⏳</div>
        <div className="font-bold text-lg md:text-xl text-white tracking-wide">
          TaskMaster
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-[#9EABB8] hover:text-white transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-[#23272f] font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className="text-[#9EABB8] hover:text-white transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-[#23272f] font-medium"
            >
              Tasks
            </Link>
            <button
              onClick={signOut}
              className="text-[#9EABB8] hover:text-white transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-[#23272f] font-medium"
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
