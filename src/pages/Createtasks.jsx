import { useState } from "react";

function Createtasks() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((pre) => ({ ...pre, [name]: value }));
  };
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.startDate || !task.endDate) {
      setError("Please fill in all fields.");
      return;
    }
    if (task.endDate < task.startDate) {
      setError("Incorrect date");
      return;
    }
    setError("");
  };
  return (
    <>
      <form className="createtask-form" onSubmit={handleSubmit}>
        <div className="input-scop">
          <label className="createtask-label">TaskTitle</label>
          <input
            name="title"
            className="createtask-input"
            type="text"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-scope">
          <label className="createtask-label">description</label>
          <input
            name="description"
            className="createtask-input"
            type="text"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-scope">
          <label className="createtask-label">Start Date</label>
          <input
            name="startDate"
            className="createtask-input"
            type="date"
            placeholder="Enter task Start Date"
            value={task.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="input-scope">
          <label className="createtask-label">End Date</label>
          <input
            name="endDate"
            className="createtask-input"
            type="date"
            placeholder="Enter task date"
            value={task.endDate}
            onChange={handleChange}
          />
        </div>
        {error && <div className="createtask-error">{error}</div>}
        <button className="createtask-btn" type="submit">
          Create Task
        </button>
      </form>
    </>
  );
}

export default Createtasks;
