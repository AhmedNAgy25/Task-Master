import { useState } from "react";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("allTasks");

  const tasks = [
    { name: "", date: "", status: "" },
    { name: "", date: "", status: "" },
    { name: "", date: "", status: "" },
    { name: "Update client report", date: "2024-03-25", status: "completed" },
    { name: "Follow up with vendors", date: "2024-03-28", status: "inProgress" },
  ];
  

 const taskTabs = ["allTasks", "inProgress", "completed"];

  const filteredTasks =
    activeTab === "allTasks"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);

  return (
    <>
      <button className="new-task-btn">New Task</button>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
