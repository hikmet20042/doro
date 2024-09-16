import { useState } from "react";

export function Task({ task, setTasks, tasks, checked, id }) {
  const [status, setStatus] = useState("done");
  const [inputValue, setInputValue] = useState("New Task");
  const [taskText, setTaskText] = useState(task || "New Task");
  const [done, setDone] = useState(checked || false);
  function handleDeleteTask() {
    let newTasks = tasks.filter((t) => t[0] !== id);
    setTasks(newTasks);
  }
  function handleEditTask() {
    setStatus("done");
    setTaskText(inputValue);
    let t = tasks.find((ta) => ta[0] === id);
    t = [t[0], { ...t[1], value: inputValue }];
    let newTasks = tasks.filter((ta) => ta[0] !== id);
    newTasks.splice(t[0][t[0].length - 1], 0, t);
    newTasks.sort((a, b) => +b[0][-1] - +a[0][-1]);
    setTasks(newTasks);
  }
  function handleToggleTask() {
    setDone(!done);
    let t = tasks.find((ta) => ta[0] === id);
    t = [t[0], { ...t[1], done: !done }];
    let newTasks = tasks.filter((ta) => ta[0] !== id);
    newTasks.splice(t[0][t[0].length - 1], 0, t);
    setTasks(newTasks);
  }
  return (
    <li
      className="flex items-center relative justify-center text-md sm:text-sm w-full "
      id={id}
    >
      <div
        onClick={handleToggleTask}
        className="flex items-center cursor-pointer p-1"
      >
        <i className={"fa-regular fa-square text-lg" + ((done && "-check") || "")}></i>
      </div>
      {status === "editing" && (
        <div className="absolute left-7 flex z-30">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            value={inputValue}
            maxLength={53}
            className=" bg-black bg-opacity-70 text-inherit outline-none border-b  py-0"
          />
          <button
            onClick={handleEditTask}
            className="border bg-white  text-black text-xs px-1 mx-1"
          >
            OK
          </button>
          <button
            onClick={() => {
              setStatus("done");
            }}
            className="border bg-white  text-black text-xs px-1 ml-1"
          >
            CANCEL
          </button>
        </div>
      )}

      <div
        className={
          "min-w-28 w-full  mx-2 leading-3 flex items-center" +
          (done ? " line-through text-gray-200" : "") +
          (status === "editing" ? " invisible" : "")
        }
      >
        {taskText}
      </div>

      <div className="mb-0.5 cursor-pointer flex items-center">
        <i
          className={
            "fa-regular fa-pen-to-square text-sm" +
            ((done && " invisible") || "") +
            (status === "editing" ? " invisible" : "")
          }
          onClick={() => setStatus("editing")}
        ></i>
        <i
          className={
            "fa-solid fa-xmark ml-1 text-lg" +
            (status === "editing" ? " invisible" : "")
          }
          onClick={handleDeleteTask}
        ></i>
      </div>
    </li>
  );
}
