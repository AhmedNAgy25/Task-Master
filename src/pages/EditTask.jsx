import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

function EditTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "inProgress",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { taskIndex } = useParams();

  useEffect(() => {
    if (taskIndex && tasks[taskIndex]) {
      const currentTask = tasks[taskIndex];
      setTask({
        title: currentTask.name,
        description: currentTask.description || "",
        startDate: currentTask.startDate || "",
        endDate: currentTask.date,
        status: currentTask.status,
      });
    }
  }, [taskIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!task.title || !task.endDate) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    if (task.startDate && task.endDate && task.endDate < task.startDate) {
      setError("End date cannot be before start date.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      console.log("Task updated:", task);
      setIsLoading(false);
      navigate("/tasks");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  if (!taskIndex || !tasks[taskIndex]) {
    return (
      <div className="error-container">
        <h2>Task not found</h2>
        <p>The task you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/tasks")} className="back-btn">
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="edit-task-header">
        <h2>Edit Task</h2>
        <p>Update the task details below</p>
      </div>

      <form className="edittask-form" onSubmit={handleSubmit}>
        <div className="input-scope">
          <label className="edittask-label">Task Title</label>
          <input
            name="title"
            className="edittask-input"
            type="text"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="input-scope">
          <label className="edittask-label">Description</label>
          <textarea
            name="description"
            className="edittask-input"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
            disabled={isLoading}
            rows="4"
          />
        </div>

        <div className="input-scope">
          <label className="edittask-label">Start Date</label>
          <input
            name="startDate"
            className="edittask-input"
            type="date"
            placeholder="Enter task start date"
            value={task.startDate}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="input-scope">
          <label className="edittask-label">End Date</label>
          <input
            name="endDate"
            className="edittask-input"
            type="date"
            placeholder="Enter task end date"
            value={task.endDate}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="input-scope">
          <label className="edittask-label">Status</label>
          <select
            name="status"
            className="edittask-input"
            value={task.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && <div className="edittask-error">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button className="edittask-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Updating" : "Update Task"}
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTask;
