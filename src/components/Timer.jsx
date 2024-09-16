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
  const [timeInput, setTimeInput] = useState(0);

  function handleBlur(e) {
    setTotalTime(timeInput * 60);
    if (String(timeInput).length === 1) {
      setTimeInput("0" + timeInput);
    }
  }

  function handleChange(e) {
    if (String(e.target.value).length >= 3) {
      return;
    } else {
      setTimeInput(e.target.value);
      updateSelectedTime(e.target.value);
    }
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

    setTimeInput(
      String(Math.floor(totalTime / 60)).length === 1
        ? "0" + Math.floor(totalTime / 60)
        : Math.floor(totalTime / 60)
    );

    return () => clearTimeout(timerId);
  }, [status, totalTime, selectedBtn, pomodoroCount]);

  return (
    <div className="text-white max-w-full px-10 bg-white bg-opacity-25 flex flex-col items-center justify-center rounded-lg pb-5 border-gray-300 border">
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

      <div className="text-7xl select-none max-w-full flex items-center justify-center">
        <input
          type="number"
          min={0}
          max={999}
          value={timeInput}
          onClick={(e) => e.target.select()}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-transparent outline-none text-end w-24 text-inherit h-24"
        />
        :
        {String(totalTime % 60).length === 1
          ? "0" + (totalTime % 60)
          : totalTime % 60}
      </div>
    </div>
  );
}
