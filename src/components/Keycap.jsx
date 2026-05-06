import { useBoardStore } from "../contexts/board-context";

const Keycap = ({ letter, icon, className, handleKeyPress }) => {
  const { invalidLetters, correctLetters, partialLetters } = useBoardStore();

  return (
    <button
      className={[
        "keycap-default min-w-13 flex font-medium justify-center rounded-md border-b active:scale-95 active:translate-y-0.5 transition px-4 py-1.5 w-max text-xl",
        className,
        invalidLetters.includes(letter) && "keycap-incorrect",
        partialLetters.includes(letter) && "keycap-partial",
        correctLetters.includes(letter) && "keycap-correct",
      ].join(" ")}
      onClick={() => handleKeyPress(letter)}
    >
      {icon ? icon : letter}
    </button>
  );
};

export default Keycap;
