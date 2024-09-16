import { useState } from "react";
import { Button } from "./Button";
import { Timer } from "./Timer";

export function PomodoroTimer({ autoBreak, autoPomodoro, longBreakInterval }) {
  const [status, setStatus] = useState("stopped");
  const [totalTime, setTotalTime] = useState(25 * 60);
  return (
    <section className=" w-full mt-4 flex flex-col items-center justify-center">
      <Timer
        status={status}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        setStatus={setStatus}
        autoBreak={autoBreak}
        autoPomodoro={autoPomodoro}
        longBreakInterval={longBreakInterval}
      />
      <Button
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        setStatus={setStatus}
        status={status}
      />
    </section>
  );
}
