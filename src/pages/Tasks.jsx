import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TasksPage({ tasks, deleteTask, completeTask }) {
  const [activeTab, setActiveTab] = useState("allTasks");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const taskTabs = [
    { key: "allTasks", label: "All Tasks" },
    { key: "inProgress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  const tasksArray = Array.isArray(tasks) ? tasks : [];

  const filteredTasks =
    activeTab === "allTasks"
      ? tasksArray
      : tasksArray.filter((task) =>
          activeTab === "completed" ? task.isCompleted : !task.isCompleted
        );

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setLoading(true);
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Failed to delete task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCompleteTask = async (taskId, isCompleted) => {
    setLoading(true);
    try {
      await completeTask(taskId, { isCompleted });
    } catch (error) {
      console.error("Failed to update task status:", error);
    } finally {
      setLoading(false);
    }
  };

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
                <th className="px-6 py-4 font-semibold text-center rounded-tl-xl">
                  Task
                </th>
                <th className="px-6 py-4 font-semibold text-center">
                  End Date
                </th>
                <th className="px-6 py-4 font-semibold text-center">Edit</th>
                <th className="px-6 py-4 font-semibold text-center rounded-tr-xl">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-[#23272f] last:border-b-0 hover:bg-[#202225] transition"
                >
                  <td className="px-6 py-5 text-base text-white whitespace-nowrap">
                    {task.title}
                  </td>
                  <td className="px-6 py-5 text-base text-[#9EABB8] whitespace-nowrap text-center">
                    {console.log(task.endDate.slice(0, 10))}
                    {task.endDate.slice(0, 10)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditTask(task._id)}
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
                      <button
                        onClick={() =>
                          handleCompleteTask(task._id, !task.isCompleted)
                        }
                        className={`border rounded-lg p-2 transition ${
                          task.isCompleted
                            ? "border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600"
                            : "border-green-500 hover:bg-green-500 hover:border-green-600"
                        }`}
                        title={
                          task.isCompleted
                            ? "Mark as In Progress"
                            : "Mark as Completed"
                        }
                        disabled={loading}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                            task.isCompleted
                              ? "text-yellow-500 hover:text-white"
                              : "text-green-500 hover:text-white"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="border border-red-500 rounded-lg p-2 hover:bg-red-500 hover:border-red-600 transition"
                        title="Delete task"
                        disabled={loading}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-red-500 hover:text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-block rounded-full px-6 py-2 font-semibold text-sm ${
                        task.isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {task.isCompleted ? "Completed" : "In Progress"}
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
