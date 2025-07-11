import { useState, useEffect } from "react";
import apiService from "../services/api";

function Dashboard({ tasks }) {
  const [stats, setStats] = useState([
    { label: "Total Tasks", value: 0 },
    { label: "Completed Tasks", value: 0 },
    { label: "In Progress Tasks", value: 0 },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiService.getDashboardData();
        const dashboardStats = response.stats || response;

        setStats([
          {
            label: "Total Tasks",
            value: dashboardStats.totalTasks || tasks.length || 0,
          },
          {
            label: "Completed Tasks",
            value:
              dashboardStats.completedTasks ||
              tasks.filter((task) => task.isCompleted).length ||
              0,
          },
          {
            label: "In Progress Tasks",
            value:
              dashboardStats.inProgressTasks ||
              tasks.filter((task) => !task.isCompleted).length ||
              0,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Fallback to local task data
        setStats([
          { label: "Total Tasks", value: tasks.length },
          {
            label: "Completed Tasks",
            value: tasks.filter((task) => task.isCompleted).length,
          },
          {
            label: "In Progress Tasks",
            value: tasks.filter((task) => !task.isCompleted).length,
          },
        ]);
      }
    };

    fetchDashboardData();
  }, [tasks]);

  return (
    <div className="w-full min-h-screen bg-[#121417] text-white px-4 sm:px-8 lg:px-20 py-6 flex justify-center">
      <div className="w-full max-w-[960px]">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-[#9EABB8] text-sm mt-1">
            Overview of your tasks and progress
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#293038] rounded-xl h-[120px] flex flex-col justify-center items-center"
            >
              <div className="text-base font-medium">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
