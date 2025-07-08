import { useLocation, Link } from "react-router-dom";
export default function Navbar({ isAuthenticated, signOut }) {
  const { pathname } = useLocation();

  return (
    <div className="navbar-container  sm:w-full w-[703px] h-[60px] border-b border-[#E5E8EB] px-[40px] py-[12px] bg-[#121417] flex justify-between">
      <div className="logo-container w-[136px] h-[23px] gap-x-[16px] flex justify-center  flex-row">
        <div className="logo-icon w-[16px] h-[16px] text-[#ffffff] ">⏳</div>
        <div className="logo-text w-[104px] h-[23px] font-bold text-[18px] leading-[23px] tracking-normal text-[#ffffff] flex justify-center">TaskMaster</div>
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
          <Link to="/signup" className="nav-btn text-[#ffffff] font-medium leading-[21px] tracking-normal bg-[#1A80E5] rounded-[12px] w-[133px] h-[35px] py-[5px] px-[38px] flex justify-center">
            Sign up
          </Link>
        ) : pathname === "/signup" ? (
          <Link to="/signin" className="nav-btn text-[#ffffff] font-medium leading-[21px] tracking-normal bg-[#1A80E5] rounded-[12px] w-[133px] h-[35px] py-[5px] px-[38px] flex justify-center">
            Sign in
          </Link>
        ) : null}
      </div>
    </div>
  );
}
