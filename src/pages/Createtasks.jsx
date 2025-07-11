import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createtasks({ createTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!task.title || !task.description || !task.startDate || !task.endDate) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (task.endDate < task.startDate) {
      setError("End date cannot be before start date.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createTask(task);
      if (result.success) {
        setSuccess("Task created successfully!");
        setTask({ title: "", description: "", startDate: "", endDate: "" });
        setTimeout(() => {
          navigate("/tasks");
        }, 1500);
      } else {
        setError(result.error || "Failed to create task");
      }
    } catch {
      setError("An error occurred while creating the task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen bg-[#121417] flex items-center justify-center px-2 py-8">
      <form
        className="createtask-form bg-[#181b20] text-[#ffffff] w-full max-w-lg mx-auto rounded-2xl shadow-lg px-4 sm:px-8 py-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Create New Task</h2>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[16px] text-[#ffffff]">
            Task Title
          </label>
          <input
            name="title"
            className="createtask-input w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] focus:border-[#1A80E5] focus:outline-none text-base"
            type="text"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            maxLength={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-[16px] text-[#ffffff]">
            Description
          </label>
          <textarea
            name="description"
            className="createtask-input w-full min-h-[96px] p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] focus:border-[#1A80E5] focus:outline-none text-base resize-none"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
            maxLength={500}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-[16px] text-[#ffffff]">
              Start Date
            </label>
            <input
              name="startDate"
              className="createtask-input w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] focus:border-[#1A80E5] focus:outline-none text-base"
              type="date"
              placeholder="Enter task start date"
              value={task.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-[16px] text-[#ffffff]">
              End Date
            </label>
            <input
              name="endDate"
              className="createtask-input w-full p-4 rounded-2xl border-2 border-[#3D4754] bg-[#1C2126] focus:border-[#1A80E5] focus:outline-none text-base"
              type="date"
              placeholder="Enter task end date"
              value={task.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && (
          <div className="createtask-error w-full text-center text-red-400 font-medium py-2 rounded-lg bg-[#23272f]">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full text-center text-green-400 font-medium py-2 rounded-lg bg-[#23272f]">
            {success}
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
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Createtasks;
