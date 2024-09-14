import { useState } from "react";
import { ButtonGroup } from "./ButtonGroup";
import { useEffect } from "react";

export function Timer({
  status = "stopped",
  setStatus,
  totalTime,
  setTotalTime,
  autoBreak,
  autoPomodoro,
  longBreakInterval,
}) {
  const [timerId, setTimerId] = useState(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [selectedBtn, setSelectedBtn] = useState("Pomodoro");
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  function handleBlur(e) {
    const inputMinute = e.target.value || 0; // If empty, set to 0
    setTotalTime(inputMinute * 60);
  }

  function handleChange(e) {
    const inputValue = e.target.value;

    if (inputValue.toString().length >= 5) return;
    setTotalTime(inputValue * 60);

    updateSelectedTime(inputValue);
    setPomodoroCount(0);
  }

  function updateSelectedTime(value) {
    if (selectedBtn === "Pomodoro") {
      setPomodoroTime(value);
    } else if (selectedBtn === "Short Break") {
      setShortBreak(value);
    } else {
      setLongBreak(value);
    }
  }

  function handleAutoBreak() {
    setSelectedBtn("Short Break");
    setPomodoroCount(pomodoroCount + 1);
    if (pomodoroCount === 1) {
      setStatus("stopped");
      setSelectedBtn("Pomodoro");
    }
  }

  function handleAutoBreakAndPomodoro() {
    if (selectedBtn === "Pomodoro") {
      if (pomodoroCount < longBreakInterval) {
        setSelectedBtn("Short Break");
        setPomodoroCount(pomodoroCount + 1);
      } else {
        setSelectedBtn("Long Break");
        setPomodoroCount(0);
      }
    } else {
      setSelectedBtn("Pomodoro");
    }
  }

  function resetTotalTime() {
    if (selectedBtn === "Pomodoro") {
      setTotalTime(pomodoroTime * 60);
    } else if (selectedBtn === "Short Break") {
      setTotalTime(shortBreak * 60);
    } else {
      setTotalTime(longBreak * 60);
    }
  }

  useEffect(() => {
    if (status === "started") {
      const timeoutId = setTimeout(() => {
        setTotalTime((prevTotalTime) => prevTotalTime - 1);
      }, 1000);
      setTimerId(timeoutId);
    }

    if (totalTime === 0) {
      clearTimeout(timerId);

      if (autoBreak && autoPomodoro) {
        handleAutoBreakAndPomodoro();
      } else if (autoBreak && !autoPomodoro) {
        handleAutoBreak();
      } else {
        setStatus("stopped");
      }

      resetTotalTime();
    }

    if (status === "stopped") {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId);
  }, [status, totalTime, selectedBtn, pomodoroCount]);

  return (
    <div className="text-white bg-white bg-opacity-25 flex flex-col items-center rounded-lg pb-5 border-gray-300 border">
      <ButtonGroup
        status={status}
        setTotalTime={setTotalTime}
        setStatus={setStatus}
        selectedBtn={selectedBtn}
        setSelectedBtn={setSelectedBtn}
        totalTime={totalTime}
        pomodoroTime={pomodoroTime}
        shortBreak={shortBreak}
        longBreak={longBreak}
      />

      <div className="text-7xl select-none">
        <input
          type="number"
          min={0}
          value={
            String(Math.floor(totalTime / 60)).length === 1
              ? "0" + Math.floor(totalTime / 60)
              : Math.floor(totalTime / 60)
          }
          max={9999}
          onClick={(e) => e.target.select()}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-transparent outline-none text-end w-1/2 text-inherit h-24"
        />
        :
        {String(totalTime % 60).length === 1
          ? "0" + (totalTime % 60)
          : totalTime % 60}
      </div>
    </div>
  );
}
