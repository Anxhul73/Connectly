const NavButton = ({
  icon: Icon,
  text,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="
      flex
      items-center
      gap-4
      w-full
      px-4
      py-3
      rounded-xl
      text-zinc-300
      hover:bg-zinc-800
      hover:text-white
      transition
      duration-300
      overflow-hidden
      cursor-pointer
    "
  >
    <Icon 
        size={24} 
        className = "min-w-[24px]" shrink-0
    />

    <span
      className="
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-300
        whitespace-nowrap
      "
    >
      {text}
    </span>
  </button>
);

export default NavButton;
