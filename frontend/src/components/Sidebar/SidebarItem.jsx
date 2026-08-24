import { NavLink } from "react-router-dom";
import clsx from "clsx";

function SidebarItem({
  icon: Icon,
  label,
  to,
  expanded,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "w-full flex items-center gap-4 h-12 px-4 rounded-  xl ",
          "text-zinc-400 hover:bg-white/5 hover:text-white",
          isActive &&
            "bg-violet-500/15 border border-violet-400/20 shadow-[0_0_18px_rgba(91,61,245,.18)]"
        )
      }
    >
      <div className="w-7 flex justify-center">
        <Icon
          size={22}
          strokeWidth={2}
          className="shrink-0 w-6 h-6"
        />
      </div>
      

      {expanded && (
        <span className="whitespace-nowrap">
          {label}
        </span>
      )}
    </NavLink>
  );
}

export default SidebarItem;