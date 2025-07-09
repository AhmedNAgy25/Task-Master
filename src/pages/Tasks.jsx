import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("allTasks");
  const navigate = useNavigate();

  const tasks = [
    { name: "add feature", date: "2025-03-25", status: "completed" },
    {
      name: "edit routing system",
      date: "2025-07-28",
      status: "inProgress",
    },
    { name: "edit styling", date: "2025-03-25", status: "completed" },
    {
      name: "fix logic",
      date: "2025-02-28",
      status: "inProgress",
    },
    { name: "fix responsice", date: "2025-11-25", status: "inProgress" },
    {
      name: "solve ton of conflicts",
      date: "2025-03-18",
      status: "inProgress",
    },
    { name: "go to iti", date: "2025-03-5", status: "completed" },
    {
      name: "i add anything",
      date: "2025-09-8",
      status: "inProgress",
    },
  ];

  const taskTabs = ["allTasks", "inProgress", "completed"];

  const filteredTasks =
    activeTab === "allTasks"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);

  const handleNewTask = () => {
    navigate("/createtask");
  };

  const handleEditTask = (taskIndex) => {
    navigate(`/edittask/${taskIndex}`);
  };

  return (
    <div>
      <button className="new-task-btn bg-[#2D2D2D] hover:bg-[#3A3A3A] text-white px-4 py-2 rounded-md shadow-md text-sm float-right mb-6 font-sans" onClick={handleNewTask}>
        New Task
      </button>
      <div className="tasksContainer bg-[#121417] text-[#ffffff] py-5 px-40">
        <h2 className="page-title text-3xl font-bold mb-4 text-white font-sans bg-[#121417]">My Tasks</h2>

        <div className="tabs flex space-x-6 border-b border-gray-600 mb-6 font-sans bg-[#121417]">
          {taskTabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn pb-2 text-sm capitalize font-medium transition-all duration-200 ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
<div className="flex justify-center">
  <table className="taskTable ..."></table>
</div>
        <table className="taskTable table-auto text-left text-sm sm:w-full w-[960px] py-3 px-4 ">
          <thead>
            <tr className="bg-[#2A2A2A] text-white border-b border-gray-600">
              <th className="px-6 py-3 font-medium">Task</th>
            <th className="px-6 py-3 font-medium">End Date</th>
            <th className="px-6 py-3 font-medium">Edit</th>
            <th className="px-6 py-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="min-h-[300px] max-h-[400px] overflow-auto">
            {filteredTasks.map((task, index) => (
                  <tr key={index} className="border-b border-gray-600 bg-[#121417]">
              <td className="px-6 py-5 text-base text-white">{task.name}</td>
              <td className="px-6 py-5 text-base text-white">{task.date}</td>
              <td className="px-6 py-5 text-base text-white cursor-pointer" onClick={handleEditTask}>✏️</td>
              <td className="px-6 py-5 text-center">
                <span className="text-white text-sm font-semibold bg-[#2D2D2D] px-6 py-2 rounded-xl inline-block">
                  {task.status}
                </span>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
