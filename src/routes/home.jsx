import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <header className="max-w-xl w-full flex justify-center mx-auto pb-6">
        <Logo />
      </header>

      <div></div>

      <div className="border-t border-zinc-200 pt-6 max-w-xs w-full mx-auto">
        <Link to="/solo">
          <div className="bg-teal-600 rounded-xl mt-2 shadow-xl">
            <button className="border-2 border-teal-600 shadow-[inset_0_2px_0_0_var(--color-teal-300)]  py-3 text-sm rounded-xl bg-teal-400 text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
              <span className="ml-2 mr-6 text-lg transition font-medium">
                PLAY
              </span>
            </button>
          </div>
        </Link>

        <div className="flex items-center mt-4 gap-2">
          <div className="w-full bg-sky-600 rounded-xl mt-2 shadow-xl">
            <button className="border-2 border-sky-600 shadow-[inset_0_2px_0_0_var(--color-sky-300)]  py-2 text-sm rounded-xl bg-sky-400 text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
              <span className="text-center text-base transition font-medium">
                multiplayer
              </span>
            </button>
          </div>

          <div className="bg-mauve-600 rounded-xl mt-2 shadow-xl">
            <button className="border-2 border-mauve-600 shadow-[inset_0_2px_0_0_var(--color-mauve-300)]  py-2 text-sm rounded-xl bg-mauve-400 text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
              <span className="px-4 text-base transition font-medium">
                share
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
