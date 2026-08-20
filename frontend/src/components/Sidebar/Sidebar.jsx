import { useState, useRef, useEffect } from "react";
import {
  House,
  User,
  SquarePlus,
  Bookmark,
  Settings,
  LogOut,
  
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

import logoIcon from "../../assets/C_Logo.png"
import logoText from "../../assets/CN.png"

function Sidebar({ handleLogout }) {
  const [expanded, setExpanded] = useState(false);

  const expandTimeout = useRef(null);
  const collapseTimeout = useRef(null);

  const mainItems = [
  {
    icon: House,
    label: "Feed",
    to: "/feed",
  },
  {
    icon: User,
    label: "Profile",
    to: "/profile",
  },
  {
    icon: SquarePlus,
    label: "Create Post",
    to: "/create-post",
  },
  {
    icon: Bookmark,
    label: "Saved",
    to: "/saved",
  },
];

const utilityItems = [
  {
    icon: Settings,
    label: "Settings",
    to: "/settings",
  },
];

const handleMouseEnter = () => {
  clearTimeout(collapseTimeout.current)
;

expandTimeout.current = setTimeout(() => {
  setExpanded(true);
}, 280);
};

const handleMouseLeave = () => {
  clearTimeout(expandTimeout.current);

  collapseTimeout.current = setTimeout(() => {
    setExpanded(false);
  }, 250);
}

useEffect(() => {
  return() => {
    clearTimeout(expandTimeout.current);
    clearTimeout(collapseTimeout);
  }
}, [])

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        fixed
        top-4
        left-4
        h-[calc(100vh_-_2rem)]
        ${expanded ? "w-58" : "w-14"}
        rounded-3xl
        bg-zinc-900/45
        backdrop-blur-2xl
        border
        border-white/10
        shadow-2xl
        shadow-black/40
        overflow-hidden
        z-50
        flex
        flex-col
        items-stretch
        transition-all 
        duration-300 ease-in-out
        animate-in fade-in 
      `}
    >
      {/* Logo */}
      <div
        className="
        flex
        items-center
        gap-4
        px-4
        pt-7
        pb-6
        gap-4
        overflow-hidden
        shrink-0
    "
      >
        <img
          src={logoIcon}
          alt="ConnectLY"
          className={`
            w-12
            h-10
            shrink-0
            transition-transform
            duration-300
            ${expanded ? "rotate-0 scale-100" : "scale-95"}
        `}
        />

        <img
          src={logoText}
          alt="ConnectLY"
          className={`
            h-15
            object-contain
            transition-all
            duration-300
            origin-left

            ${
              expanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-3"
            }
        `}
        />
      </div>

      <div className="mx-4 border-t border-white/5" />

      {/*Navigation*/}
      <div className="flex-1 flex flex-col justify-between gap-8 px-4 pt-28 w-full">
        <SidebarSection>
          {mainItems.map((item) => (
            <SidebarItem key={item.label} {...item} expanded={expanded} />
          ))}
        </SidebarSection>

        <div >
          <SidebarSection>
            {utilityItems.map((item) => (
              <SidebarItem key={item.label} {...item} expanded={expanded} />
            ))}
          </SidebarSection>
        </div>
      </div>

      {/* Logout */}
      <div className=" px-4 pb-10 pt-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="
            flex
            justify-start
            w-full
            gap-4
            px-3
            py-3
            rounded-xl
            text-zinc-400
            hover:bg-red-500/10
            hover:text-red-400
            transition-all
            duration-300
          "
        >
          <LogOut size={26} className="shrink-0 w-6 h-6" />

          {expanded && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>
      <div className="mx-4 border-t border-white/5" />

    </aside>
  );
}

export default Sidebar;