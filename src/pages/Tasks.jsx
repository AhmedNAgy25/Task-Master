import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("allTasks");
  const navigate = useNavigate();

  const tasks = [
    {
      name: "Review project proposal",
      date: "2024-03-15",
      status: "inProgress",
    },
    {
      name: "Prepare presentation slides",
      date: "2024-03-20",
      status: "completed",
    },
    { name: "Schedule team meeting", date: "2024-03-22", status: "inProgress" },
    { name: "Update client report", date: "2024-03-25", status: "completed" },
    {
      name: "Follow up with vendors",
      date: "2024-03-28",
      status: "inProgress",
    },
  ];

  const taskTabs = [
    { key: "allTasks", label: "All Tasks" },
    { key: "inProgress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

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
    <div className="min-h-screen bg-[#181A1B] px-2 sm:px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            My Tasks
          </h2>
          <button
            className="bg-[#1A80E5] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#1980E5] transition w-fit self-end sm:self-auto"
            onClick={handleNewTask}
          >
            New Task
          </button>
        </div>
        <div className="flex space-x-6 border-b border-[#23272f] mb-6">
          {taskTabs.map((tab) => (
            <button
              key={tab.key}
              className={`pb-2 text-base font-semibold transition-colors relative ${
                activeTab === tab.key
                  ? "text-white after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-white"
                  : "text-[#9EABB8] hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#181b20] rounded-xl text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#23272f] text-[#9EABB8]">
                <th className="px-6 py-4 font-semibold rounded-tl-xl">Task</th>
                <th className="px-6 py-4 font-semibold">End Date</th>
                <th className="px-6 py-4 font-semibold">Edit</th>
                <th className="px-6 py-4 font-semibold rounded-tr-xl">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr
                  key={index}
                  className="border-b border-[#23272f] last:border-b-0 hover:bg-[#202225] transition"
                >
                  <td className="px-6 py-5 text-base text-white whitespace-nowrap">
                    {task.name}
                  </td>
                  <td className="px-6 py-5 text-base text-[#9EABB8] whitespace-nowrap">
                    {task.date}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => handleEditTask(index)}
                      className="border border-[#9EABB8] rounded-lg p-2 hover:bg-[#5d6472] hover:border-[#ffffff] transition"
                      title="Edit task"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-[#9EABB8] hover:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L8.978 18.312a4.2 4.2 0 0 1-1.768 1.06l-3.07.92.92-3.07a4.2 4.2 0 0 1 1.06-1.768L16.862 4.487ZM16.862 4.487l2.65 2.65"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-block rounded-full px-6 py-2 font-semibold text-sm ${
                        task.status === "completed"
                          ? "bg-[#23272f] text-white"
                          : "bg-[#23272f] text-white"
                      }`}
                    >
                      {task.status === "inProgress"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
