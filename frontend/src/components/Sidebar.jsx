import handleLogout from "../pages/Feed";

function Sidebar({ handleLogout }) {
  return (
    <div
      className="
        w-[270px]
        min-h-screen
        bg-zinc-900
        border-r
        border-zinc-800
        p-6
        "
    >
      <h1
        className="
                text-white
                font-bold
                text-3xl
                mb-10
            "
      >
        ConnectLY
      </h1>

      <div
        className="
            flex
            flex-col
            gap-3
        "
      >
        <h2
          className="
                text-white
                font-semibold
            "
        >
          Profile
        </h2>
      </div>

      <button
        onClick={handleLogout}
        className="

                text-left
                px-4
                py-3
                rounded-lg
                text-zinc-300
                hover:bg-zinc-800
                hover:text-white
                transition-all
                duration-300
                cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
