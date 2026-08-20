import { LoaderCircle } from "lucide-react";

function Loader({
  title = "Loading...",
  subtitle = "",
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-999
        flex
        items-center
        justify-center

        pointer-events-none

        animate-in
        fade-in
        duration-300
      "
    >
      <div
        className="
          pointer-events-auto
          relative
          overflow-hidden

          flex
          flex-col
          items-center
          justify-center
          gap-5

          w-60
          h-60
          px-10
          py-9
          
          rounded-3xl

          bg-zinc-900/30
          backdrop-blur-[30px]

          border
          border-white/20

          shadow-[0_20px_60px_rgba(0,0,0,0.35)]

          animate-in
          zoom-in-95
          fade-in
          opacity-
          duration-300
          ease-in
        "
      >
        {/* Glass Highlight */}
        <div
          className="
            absolute
            inset-0
            rounded-3xl
            bg-linear-to-b
            from-white/10
            via-transparent
            to-transparent
            pointer-events-none
          "
        />

        {/* Ambient Glow */}

        <div
          className="
            absolute
            w-32
            h-32
            rounded-full
            bg-violet-500/30
            blur-3xl
            opacity-70
          "
        />

        {/* Spinner */}

        <LoaderCircle
          className="
            relative
            w-16
            h-16
            text-[#8B5CF6]
            animate-[spin_1.2s_linear_infinite]
          "
        />


        {/*Text*/}
        <div className="relative text-center ">

          <h2
            className="
              text-xl
              font-semibold
              tracking-tight
              text-white
            "
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="
                mt-2
                text-sm
                text-zinc-300
              "
            >
              {subtitle}
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default Loader;