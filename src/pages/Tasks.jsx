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
    <>
      <button className="new-task-btn" onClick={handleNewTask}>
        New Task
      </button>
      <div className="tasksContainer">
        <h2 className="page-title">My Tasks</h2>

        <div className="tabs">
          {taskTabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <table className="taskTable">
          <thead>
            <tr>
              <th>Task</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.date}</td>
                <td>
                  <span className={`status-tag ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEditTask(index)}
                    className="edit-btn"
                    title="Edit task"
                  >
                    ✏️Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
