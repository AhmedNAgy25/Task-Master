import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const tasks = [
  { name: "add feature", date: "2025-03-25", status: "completed" },
  { name: "edit routing system", date: "2025-07-28", status: "inProgress" },
  { name: "edit styling", date: "2025-03-25", status: "completed" },
  { name: "fix logic", date: "2025-02-28", status: "inProgress" },
  { name: "fix responsice", date: "2025-11-25", status: "inProgress" },
  { name: "solve ton of conflicts", date: "2025-03-18", status: "inProgress" },
  { name: "go to iti", date: "2025-03-05", status: "completed" },
  { name: "i add anything", date: "2025-09-08", status: "inProgress" },
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
      setIsLoading(false);
      navigate("/tasks");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  if (!taskIndex || !tasks[taskIndex]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121417] px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-2">Task not found</h2>
        <p className="text-[#9eabb8] mb-4">
          The task you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/tasks")}
          className="bg-[#1A80E5] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#176fc2] transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121417] flex items-center justify-center px-2 py-8">
      <form
        className="bg-[#181b20] text-[#ffffff] w-full max-w-lg mx-auto rounded-2xl shadow-lg px-4 sm:px-8 py-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Edit Task</h2>
        <p className="text-center text-[#9eabb8] mb-2">
          Update the task details below
        </p>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[16px] text-[#ffffff]">
            Task Title
          </label>
          <input
            name="title"
            className="w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] focus:border-[#1A80E5] focus:outline-none text-base"
            type="text"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[16px] text-[#ffffff]">
            Status
          </label>
          <select
            name="status"
            className="w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] text-[#ffffff] focus:border-[#1A80E5] focus:outline-none text-base"
            value={task.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[16px] text-[#ffffff]">
            Description
          </label>
          <textarea
            name="description"
            className="w-full min-h-[96px] p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] focus:border-[#1A80E5] focus:outline-none text-base resize-none"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={500}
            rows={4}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-[16px] text-[#ffffff]">
              Start Date
            </label>
            <input
              name="startDate"
              className="w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] text-[#9EABB8] focus:border-[#1A80E5] focus:outline-none text-base"
              type="date"
              placeholder="Enter task start date"
              value={task.startDate}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-[16px] text-[#ffffff]">
              End Date
            </label>
            <input
              name="endDate"
              className="w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] text-[#9EABB8] focus:border-[#1A80E5] focus:outline-none text-base"
              type="date"
              placeholder="Enter task end date"
              value={task.endDate}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>
        {error && (
          <div className="w-full text-center text-red-400 font-medium py-2 rounded-lg bg-[#23272f]">
            {error}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            type="button"
            className="w-full sm:w-auto bg-[#1A80E5] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#176fc2] transition-colors"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto bg-[#1A80E5] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#176fc2] transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
