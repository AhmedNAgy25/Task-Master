import React from "react";

function Dashboard() {
  const stats = [
    { label: "Total Tasks", value: 120 },
    { label: "Completed Tasks", value: 85 },
    { label: "In progress Tasks", value: 20 },
  ];
  return (
    <>
      <div className="dashboard-title-container">
        <div className="dashboard">
          <h1>Dashboard</h1>
        </div>
        <div className="descripe">
          <p>Overview of your tasks and progress</p>
        </div>
      </div>
      <div className="cards-container">
        {stats.map((stat, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-name">{stat.label}</div>
              <div className="card-number">{stat.value}</div>
            </div>
          );
        })}
      </div>
      <h2>Task Overview</h2>
    </>
  );
}
export default Dashboard;
