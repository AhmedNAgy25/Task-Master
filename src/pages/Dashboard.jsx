import React from "react";

function Dashboard() {
  const stats = [
    { label: "Total Tasks", value: 120 },
    { label: "Completed Tasks", value: 85 },
    { label: "In progress Tasks", value: 20 },
  ];
  return (
    <>
    <div className="sm:w-full  w-[960] min-h-screen bg-[#121417] text-white px-40 py-6 ">
      <div className="dashboard-title-container sm:w-full max-w-[960px]  ">
        <div className="dashboard ">
          <h1 className="text-[32px] font-bold">Dashboard</h1>
        </div>
        <div className="descripe mb-6">
          <p className="text-[#9EABB8] text-sm">Overview of your tasks and progress</p>
        </div>
      </div>
      <div className="cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          return (
            <div className="card bg-[#293038] rounded-xl h-[100px] flex flex-col justify-center items-center" key={index}>
              <div className="card-name text-base font-medium">{stat.label}</div>
              <div className="card-number text-2xl font-bold">{stat.value}</div>
            </div>
          );
        })}
      </div>
      <h2 className="text-[22px] font-bold">Task Overview</h2>
    </div>
    </>
  );  
}
export default Dashboard;
