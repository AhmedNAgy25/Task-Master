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
      <form
        className="createtask-form createtask-form bg-[#121417] text-[#ffffff] sm:w-full w-[1280px] min-h-screen px-40 py-5"
        onSubmit={handleSubmit}
      >
        <div className="input-scop w-[480px] max-w-[480px] py-[12px] px-[16px] gap-y-[16px] flex justify-center items-center flex-col">
          <label className="createtask-label createtask-label w-[448px] h-[24px] font-medium text-[16px] leading-[24px] tracking-normal text-[#ffffff]">
            TaskTitle
          </label>
          <input
            name="title"
            className="createtask-input w-[448px] h-[58px] p-[15px] rounded-2xl border-2 border-[#3D4754] bg-[#1C2126]"
            type="text"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-scope w-[480px] h-[200px] max-w-[480px] py-[12px] px-[16px] gap-y-[16px] flex justify-center items-center flex-col ">
          <label className="createtask-label w-[448px] h-[24px] font-medium text-[16px] leading-[24px] tracking-normal text-[#ffffff]">
            description
          </label>
          <input
            name="description"
            className="createtask-input w-[448px] h-[144px] min-h-[144px] p-[15px] rounded-2xl border-2 border-[#3D4754] bg-[#1C2126]"
            type="text"
            placeholder="Enter task description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-scope w-[480px] h-[112px] max-w-[480px] py-[12px] px-[16px] gap-y-[16px] flex justify-center items-center flex-col">
          <label className="createtask-label w-[448px] h-[24px] font-medium text-[16px] leading-[24px] tracking-normal text-[#ffffff]">
            Start Date
          </label>
          <input
            name="startDate"
            className="createtask-input w-[448px] h-[58px] p-[15px] rounded-2xl border-2 border-[#3D4754] bg-[#1C2126]"
            type="date"
            placeholder="Enter task Start Date"
            value={task.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="input-scope w-[480px] h-[112px] max-w-[480px] py-[12px] px-[16px] gap-y-[16px] flex justify-center items-center flex-col">
          <label className="createtask-label w-[448px] h-[24px] font-medium text-[16px] leading-[24px] tracking-normal text-[#ffffff]">
            End Date
          </label>
          <input
            name="endDate"
            className="createtask-input w-[448px] h-[58px] p-[15px] rounded-2xl border-2 border-[#3D4754] bg-[#1C2126]"
            type="date"
            placeholder="Enter task date"
            value={task.endDate}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div className="createtask-error w-[960px] h-[64px] max-w-[480px] py-[12px] px-[16px] gap-y-[16px] flex justify-center items-center ">
            {error}
          </div>
        )}
        <button
          className="createtask-btn w-[115px] h-[40px] sm:w-full min-w-[84px] max-w-[480px] mt-6  bg-[#1A80E5] rounded-lg font-bold text-[14px] leading-[21px] tracking-normal text-[#ffffff]"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </>
  );
}

export default Createtasks;
