import { useLocation, Link } from "react-router-dom";
export default function Navbar({ isAuthenticated, signOut }) {
  const { pathname } = useLocation();

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <div className="logo-icon">⏳</div>
        <div className="logo-text">TaskMaster</div>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <button className="nav-link" onClick={signOut}>
              Sign out
            </button>
          </>
        ) : pathname === "/signin" ? (
          <Link to="/signup" className="nav-btn">
            Sign up
          </Link>
        ) : pathname === "/signup" ? (
          <Link to="/signin" className="nav-btn">
            Sign in
          </Link>
        ) : null}
      </div>
    </div>
  );
}
