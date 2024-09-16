import { useState, useRef, useEffect } from "react";

export function Header({ tasks, setTasks }) {
  let [toggleTasksSettings, setToggleTasksSettings] = useState(false);
  const menuRef = useRef(null); // Reference to the menu container

  function clearCompletedTasks() {
    let newTasks = tasks.filter((task) => !task[1].done);
    setTasks(newTasks);
    setToggleTasksSettings(false);
  }

  // Function to handle clicks outside the ul element
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggleTasksSettings(false);
    }
  };

  // Add event listener on component mount, remove on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between border-b-2 text-lg ">
      <div className="text">Tasks</div>
      <div className="menu relative text-xl " ref={menuRef}>
        <i
          onClick={() => setToggleTasksSettings(!toggleTasksSettings)}
          className="fa-solid fa-ellipsis cursor-pointer hover:opacity-90"
        ></i>
        {toggleTasksSettings && (
          <ul className="absolute select-none right-0 py-2 rounded z-50 text-xs min-w-max bg-white text-black">
            <li
              className="py-1 px-4 border-b cursor-pointer"
              onClick={() => {
                setTasks([]);
                setToggleTasksSettings(false);
              }}
            >
              Clear All Tasks
            </li>
            <li
              className="py-1 px-4 cursor-pointer"
              onClick={clearCompletedTasks}
            >
              Clear Completed Tasks
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
