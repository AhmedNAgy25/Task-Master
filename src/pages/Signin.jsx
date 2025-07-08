import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
  };

  return (
    <div className="auth-container sm:w-full w-[703px]  h-[713px]  py-[20px] gap-y-[9px]  bg-[#121417]  text-[#ffffff] flex justify-center items-center flex-col">
      <h2 className="auth-title  w-[671px]  h-[67px] pt-[20px] pb-[12px] px-[20px] text-center text-[18px] font-extrabold leading-[23px] tracking-normal font-inter">Welcome back</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-scope w-[480px] max-w-[480px] h-[112px] py-[12px] px-[16px] gap-4">
          <label className="auth-label w-[448px] h-[35px] pb-[10px] font-medium text-[16px] leading-6 tracking-normal block">Email</label>
          <input
            className="auth-input w-[448px] h-[56px] rounded-[12px] p-4 bg-[#293038] font-normal text-[16px] leading-6 tracking-normal text-[#9eabb8]"
            type="text"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="input-scope w-[480px] max-w-[480px] h-[112px] py-[12px] px-[16px] gap-16">
          <label className="auth-label auth-label w-[448px] h-[32px] pb-[8px] font-medium text-[16px] leading-6 tracking-normal block ">Password</label>
          <input
            className="auth-input w-[448px] h-[56px] rounded-[12px] p-4 bg-[#293038] font-normal text-[16px] leading-6 tracking-normal text-[#9eabb8]"
            type="password"
            placeholder="Entr your password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <div className="w-[480px] h-[64px] py-[12px] px-4">
        <button className="auth-btn min-w-[84px] w-[451px] max-w-[480px] h-[64px] py-[12px] px-4  bg-[#1a80e5] rounded-xl" type="submit">
          Sign in
        </button>
        </div>
      </form>
      <div className="auth-footer w-[703px] h-[37px] pt-1 pb-3 px-4 mt-6 ">
       <div className="w-[671px] h-[21px] font-normal text-[14px] leading-[21px] tracking-normal flex justify-center items-center text-[#9EABB8]"> 
        Don't have an account?
         <Link to="/signup">
        <span className="font-normal text-[14px] leading-[21px] tracking-normal underline text-[#1980E5]  "> Sign up</span>
        </Link>
        </div>
      </div>
    </div>
  );
}
