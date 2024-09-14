import { useState } from "react";
import { AddTask } from "./AddTask";
import { Header } from "./Header";
import { Task } from "./Task";

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  return (
    <section className="px-48 text-white flex flex-col">
      <Header />
      <div className="flex flex-col mt-5 px-10">
        <ul className="w-full">
          {tasks.map((task) => {
            return (
              <Task
                task={task[1].value}
                checked={task[1].done}
                id={task[0]}
                setTasks={setTasks}
                tasks={tasks}
                key={task[0]}
              />
            );
          })}
        </ul>
        <AddTask tasks={tasks} setTasks={setTasks} />
      </div>
    </section>
  );
}
