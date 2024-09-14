import { useState } from "react";

// Reusable Toggle Switch Component
function ToggleSwitch({ label, isChecked, onChange, disabled = true }) {
  return (
    <li
      className={`p-3 flex justify-between ${
        !disabled && "cursor-not-allowed"
      }`}
    >
      <div>{label}</div>
      <div
        onClick={() => disabled && onChange()}
        className={`w-10 h-5 ${
          disabled ? "cursor-pointer" : "cursor-not-allowed"
        } ${
          isChecked ? "bg-sky-400" : "bg-slate-400"
        } rounded-xl flex items-center justify-between`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform duration-500 ${
            isChecked ? "ml-5" : "ml-0.5"
          }`}
        />
      </div>
    </li>
  );
}

// Reusable Theme Option Component
function ThemeOption({ themeName, currentTheme, setTheme }) {
  return (
    <li
      onClick={() => setTheme(themeName)}
      className={`w-10 flex cursor-pointer justify-center items-center h-10 rounded text-white bg-${themeName}`}
    >
      {currentTheme === themeName && <i className="fa-solid fa-check"></i>}
    </li>
  );
}

// Reusable Font Option Component
function FontOption({ fontName, currentFont, setFontFamily, theme }) {
  return (
    <li
      onClick={() => setFontFamily(fontName)}
      className={`w-10 flex cursor-pointer justify-center items-center h-10 rounded text-white bg-${theme} font-${fontName}`}
    >
      Aa
      {currentFont === fontName && (
        <i className="fa-solid fa-check absolute text-black"></i>
      )}
    </li>
  );
}

export function Settings({
  setShowSettings,
  autoBreak,
  autoPomodoro,
  setAutoBreak,
  setAutoPomodoro,
  longBreakInterval,
  setLongBreakInterval,
  theme,
  setTheme,
  fontFamily,
  setFontFamily,
}) {
  return (
    <div className="absolute select-none mx-auto w-1/2 rounded bg-white text-black">
      <div className="py-2 px-5 text-center border-b flex items-center justify-between">
        <div>Settings</div>
        <i
          onClick={() => setShowSettings(false)}
          className="fa-solid fa-xmark text-black inline-block cursor-pointer"
        />
      </div>
      <section className="text-sm border-b">
        <div className="text-xs p-2">Timer</div>
        <ul>
          <ToggleSwitch
            label="Auto Start Breaks"
            isChecked={autoBreak}
            onChange={() => setAutoBreak(!autoBreak)}
          />
          <ToggleSwitch
            label="Auto Start Pomodoros"
            isChecked={autoPomodoro}
            disabled={autoBreak}
            onChange={() => setAutoPomodoro(!autoPomodoro)}
          />
          <li className="p-3 flex justify-between">
            <div>Long Break interval</div>
            <div className="w-10 h-5 bg-slate-400">
              <input
                type="number"
                min={2}
                max={5}
                value={longBreakInterval}
                onChange={(e) => setLongBreakInterval(e.target.value)}
                className="w-full text-white h-full bg-inherit rounded-lg outline-none text-md text-center"
              />
            </div>
          </li>
        </ul>
      </section>

      <section className="text-sm">
        <div className="text-xs p-2">Theme</div>
        <ul>
          <li className="p-3 flex items-center justify-between">
            <div>Color Themes</div>
            <ul className="flex gap-2">
              {["main", "secondTheme", "thirdTheme", "fourthTheme"].map(
                (themeName) => (
                  <ThemeOption
                    key={themeName}
                    themeName={themeName}
                    currentTheme={theme}
                    setTheme={setTheme}
                  />
                )
              )}
            </ul>
          </li>

          <li className="p-3 flex justify-between items-center">
            <div>Font Family</div>
            <ul className="flex gap-2 text-lg">
              {["main", "logo", "serif", "mono"].map((fontName) => (
                <FontOption
                  key={fontName}
                  fontName={fontName}
                  currentFont={fontFamily}
                  setFontFamily={setFontFamily}
                  theme={theme}
                />
              ))}
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
}
