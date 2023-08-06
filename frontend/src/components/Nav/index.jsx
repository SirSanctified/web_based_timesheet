const Nav = () => (
  <nav className="h-[60px] bg-orange-100 w-full py-4 px-[2rem] flex items-center justify-start ">
    <h1 className="text-blue-950 font-black text-2xl">Scheduling System</h1>
    <ul className="flex items-center justify-start gap-[2rem] ml-auto">
      <li className="text-blue-950 font-bold text-lg">
        <a href="/#">Home</a>
      </li>
      <li className="text-blue-950 font-bold text-lg">
        <a href="/#">Projects</a>
      </li>
      <li className="text-blue-950 font-bold text-lg">
        <a href="/#">Tasks</a>
      </li>
    </ul>
    <button className="flex items-center justify-center font-semibold text-gray-700 shadow-md bg-blue-200 py-2 px-5 ml-[2rem] rounded-sm">Login</button>
  </nav>
);

export default Nav;
