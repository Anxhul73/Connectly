import { useNavigate } from "react-router-dom";

function Sidebar({ handleLogout }) {

  const navigate = useNavigate();
  return (
    <div
      className="
        group
        w-12
        hover:w-64
        h-screen
        flex
        flex-col
        bg-zinc-900
        border-r
        border-zinc-800
        p-6
        transition-all
        duration-300
        items-center-safe
      "
    >
      <h1
        className="
          text-white
          font-bold
          text-2xl
          mb-10
          whitespace-nowrap
          overflow-hidden 
          "
      >

        <span className="group-hover:inline">
          C
        </span>

        <span className="hidden group-hover:inline">
          ConnectLY
        </span>

      </h1>


      <div
      className="
          flex
          flex-col
          gap-3
          flex-1
        "
      >
        <button 
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
            cursor-pointer
          "        
        >
          <span>🏠</span>

          <span className="hidden group-hover:inline whitespace-nowrap">
            Feed
          </span>
          
        </button>

        <button 
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
            cursor-pointer
          "        
        >
          <span>👤</span>

          <span className="hidden group-hover:inline whitespace-nowrap">
            Profile
          </span>
          
        </button>

        <button onClick={() => navigate("/create-post")} 
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
            cursor-pointer
          "        
        >
          <span>➕</span>

          <span className="hidden group-hover:inline whitespace-nowrap">
            Create Post
          </span>
          
        </button>
        <button 
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
            cursor-pointer
          "        
        >
          <span>⚙️</span> 

          <span className="hidden group-hover:inline whitespace-nowrap">
            Settings
          </span>
          
        </button>
        
      </div>

      <div
        className="
          flex
          flex-col
          flex-1
          justify-end
        "  
       >
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
            cursor-pointer
          "
      >
        <span>🚪</span>
        <span className="hidden group-hover:inline whitespace-nowrap">
            Logout
          </span>
      </button>

      </div>
    </div>
  );
}

export default Sidebar;
