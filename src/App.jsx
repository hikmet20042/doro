import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { Settings } from "./components/Settings";
import { Tasks } from "./components/Tasks";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [autoBreak, setAutoBreak] = useState(false);
  const [autoPomodoro, setAutoPomodoro] = useState(false);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [theme, setTheme] = useState("main");
  const [fontFamily, setFontFamily] = useState("main");
  return (
    <div
      className={`relative flex flex-col items-center min-h-screen bg-${theme} font-${fontFamily}`}
    >
      <Navbar setShowSettings={setShowSettings} />
      <PomodoroTimer
        autoBreak={autoBreak}
        autoPomodoro={autoPomodoro}
        longBreakInterval={longBreakInterval}
      />
      <Tasks />
      {showSettings && (
        <div className="bg-black w-screen h-screen absolute bg-opacity-50 flex items-center justify-center top-0 left-0">
          <Settings
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            autoBreak={autoBreak}
            setAutoBreak={setAutoBreak}
            autoPomodoro={autoPomodoro}
            setAutoPomodoro={setAutoPomodoro}
            longBreakInterval={longBreakInterval}
            setLongBreakInterval={setLongBreakInterval}
            theme={theme}
            setTheme={setTheme}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
          />
        </div>
      )}
    </div>
  );
}

export default App;
