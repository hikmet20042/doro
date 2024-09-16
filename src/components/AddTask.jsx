export function AddTask({ tasks, setTasks }) {
  return (
    <button
      onClick={() => {
        let newIdNum =
          (tasks[tasks.length - 1]
            ? Number(
                tasks[tasks.length - 1][0][
                  tasks[tasks.length - 1][0].length - 1
                ]
              )
            : -1) + 1;
        setTasks([
          ...tasks,
          [
            "id" + newIdNum,
            {
              value: "New Task",
              done: false,
            },
          ],
        ]);
      }}
      className=" mb-40 mt-2 *:border-2 w-full text-sm border-dashed bg-white bg-opacity-20"
    >
      ADD TASK
    </button>
  );
}
