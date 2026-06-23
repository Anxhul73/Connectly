
function Navbar ({handleLogout}) {
    return (
        <div
            className="
                flex
                justify-between
                items-center
                px-8
                py-6
                bg-zinc-900
                border-b
                border-zinc-800
                mx-auto
            "
        >
            <h1 className="
                text-2xl
                font-bold
                text-white
            ">
                ConnectLY
            </h1>

            <button
                onClick={handleLogout}
                className="
                    px-4
                    py-2
                    bg-zinc-800
                    text-white
                    rounded-lg
                    hover:bg-zinc-700
                    transition-all
                    duration-300
                    cursor-pointer
                "
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar;