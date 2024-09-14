export function Header() {
  return (
    <div className="flex justify-between border-b-2 text-lg ">
      <div className="text">Tasks</div>
      <div className="menu cursor-pointer text-xl hover:opacity-90">
        <i className="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  );
}
