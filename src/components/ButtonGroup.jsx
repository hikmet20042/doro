import { useEffect } from "react";
import { useState } from "react";

export function ButtonGroup({
  selectedBtn,
  setSelectedBtn,
  status,
  setTotalTime,
  setStatus,
  totalTime,
  shortBreak,
  longBreak,
  pomodoroTime,
}) {
  const btnTexts = [
    { Pomodoro: pomodoroTime },
    { "Short Break": shortBreak },
    { "Long Break": longBreak },
  ];
  useEffect(() => {
    let selected = btnTexts.find((btn) => Object.keys(btn)[0] === selectedBtn);
    setTotalTime(Object.values(selected)[0] * 60);
  }, [selectedBtn]);
  return (
    <div
      className={"border border-white border-opacity-50 rounded mt-4 text-sm"}
    >
      {btnTexts.map((btnText, index) => (
        <button
          key={index}
          onClick={() => {
            setStatus("stopped");
            setSelectedBtn(Object.keys(btnText)[0]);
          }}
          className={
            (selectedBtn === Object.keys(btnText)[0] ? "btn active" : "btn") +
            (status === "started" ? " opacity-80" : "")
          }
          disabled={status === "started"}
        >
          {Object.keys(btnText)[0]}
        </button>
      ))}
    </div>
  );
}
