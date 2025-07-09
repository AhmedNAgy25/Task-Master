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
     <div className="sm:w-full w-[1280px] h-[778px] bg-[#121417] py-5 px-40 ">
      <div className="edit-task-header sm:w-full w-[960px] h-[105px] flex justify-between flex-col p-4 ">
        <h2 className="sm:w-full w-[301px] h-[40px] font-bold text-[32px] leading-10 tracking-normal text-[#ffffff]">Edit Task</h2>
        <p className="sm:w-full w-[303px] h-[21px] font-normal text-sm leading-[21px] tracking-normal text-[#9eabb8]">Update the task details below</p>
      </div>

      <form className="edittask-form" onSubmit={handleSubmit}>
        <div className="input-scope sm:w-full max-w-[480px] h-[88px] py-3 px-4 gap-4 ">
          <label className="edittask-label  sm:w-full w-[448px] h-8 font-medium text-lg leading-6 tracking-normal text-[#ffffff] block">Task Title</label>
          <input
            name="title"
            className="edittask-input sm:w-full max-w-[448px] h-8 rounded-xl p-4 bg-[#293038] text-[#ffffff]"
            type="text"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="input-scope sm:w-full max-w-[480px] h-[88px] py-3 px-4 gap-4">
          <label className="edittask-label sm:w-full w-[448px] h-8 font-medium text-lg leading-6 tracking-normal text-[#ffffff] block">Status</label>
          <select
            name="status "
            className="edittask-input sm:w-full max-w-[448px] h-8 rounded-xl p-4 bg-[#293038] text-[#ffffff] "
            value={task.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
       
        <div className="input-scope sm:w-full max-w-[480px] h-[200px] py-3 px-4 gap-4">
          <label className="edittask-label sm:w-full w-[448px] h-8 font-medium text-lg leading-6 tracking-normal text-[#ffffff] block">Description</label>
          <textarea
            name="description "
            className="edittask-input sm:w-full max-w-[448px] h-[144px] rounded-xl p-4 bg-[#293038] text-[#ffffff]"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
            disabled={isLoading}
            rows="4"
          />
        </div>

        <div className="input-scope sm:w-full max-w-[218px] h-[88px] py-3 px-4 gap-4 inline-block">
          <label className="edittask-label sm:w-full w-[218px] h-8 font-medium text-lg leading-6 tracking-normal text-[#ffffff] block ">Start Date</label>
          <input
            name="startDate"
            className="edittask-input sm:w-full w-[216px] h-8 rounded-xl p-4 bg-[#283038] text-[#9EABB8]"
            type="date"
            placeholder="Enter task start date"
            value={task.startDate}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="input-scope sm:w-full max-w-[218px] h-[88px] py-3 px-4 gap-4 inline-block">
          <label className="edittask-label sm:w-full w-[218px] h-8 font-medium text-lg leading-6 tracking-normal text-[#ffffff] block">End Date</label>
          <input
            name="endDate"
            className="edittask-input sm:w-full w-[216px] h-8 rounded-xl p-4 bg-[#283038] text-[#9EABB8]"
            type="date"
            placeholder="Enter task end date"
            value={task.endDate}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

       

        {error && <div className="edittask-error">{error}</div>}

        <div className="form-actions text-white flex justify-items-start items-baseline gap-8 mt-6">
          <button
            type="button  "
            className="cancel-btn bg-[#1A80E5] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#176fc2] transition-colors"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button className="edittask-btn bg-[#1A80E5] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#176fc2] transition-colors" type="submit" disabled={isLoading}>
            {isLoading ? "Updating" : "Update Task"}
          </button>
        </div>
      </form>
    </div>  
    </>
  );
}

export default EditTask;
