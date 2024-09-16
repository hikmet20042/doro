import { Settings } from "./Settings";

export function Navbar({ setShowSettings }) {
  return (
    <nav className="p-3 text-xl w-full text-white flex justify-between ">
      <div className="flex cursor-pointer items-center font-logo ">
        <img src="/logo.png" alt="Logo" className="w-10" />
        <span className="mt-2 ml-[-5px] ">doro</span>
      </div>
      <div className="flex items-center gap-4">
        <div onClick={() => setShowSettings(true)} className="cursor-pointer">
          <i className="fa-solid fa-gear"></i>
        </div>
      </div>
    </nav>
  );
}
