export function Button({ status, setStatus, totalTime, setTotalTime }) {
  function handleClick() {
    setStatus(status === "stopped" ? "started" : "stopped");
  }
  return (
    <button
      className="w-2/6 bg-white p-1 rounded text-md mt-4 shadow-white shadow-sm hover:bg-slate-100"
      onClick={handleClick}
    >
      {status === "stopped" ? "START" : "STOP"}
    </button>
  );
}
