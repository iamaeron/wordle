import { useState } from "react";
import Keyboard from "../components/Keyboard";
import Logo from "../components/Logo";
import { useRef } from "react";
import { useBoardStore } from "../contexts/board-context";
import useKeyPress from "../hooks/use-key-press";
import { useCallback } from "react";
import { getRandomWord, validWords } from "../data/validWords";
import { Link, useNavigate } from "react-router-dom";

const Solo = () => {
  const boardRef = useRef(null);
  const [inexistentWord, setInexistentWord] = useState(false);
  const [guessed, setGuessed] = useState(false);
  const nav = useNavigate();
  const {
    row,
    col,
    setRow,
    setCol,
    validWord,
    setValidWord,
    guesses,
    setGuesses,
    currentGuess,
    setCurrentGuess,
    invalidLetters,
    partialLetters,
    setInvalidLetters,
    correctLetters,
    setCorrectLetters,
    setPartialLetters,
  } = useBoardStore();

  console.log(validWord);
  console.log(currentGuess);

  useKeyPress((key) => {
    handleKeyPress(key.toUpperCase());
  });

  const handleKeyPress = useCallback(
    (letter) => {
      if (letter === " ") return;

      if (letter === "ENTER") {
        if (currentGuess.length !== 5) return;
        const currentRow = boardRef.current.children[row];

        if (!validWords.includes(currentGuess.toLowerCase())) {
          console.log("invalid word");
          currentRow.classList.add("relative");
          setInexistentWord(true);
          setTimeout(() => setInexistentWord(false), 1000);
          return;
        } else {
          const newCorrect = [];
          const newPartial = [];
          const newInvalid = [];

          let correctCount = 0;

          [...currentRow.children].forEach((cell, index) => {
            const letter = currentGuess[index];
            cell.classList.remove("default");

            if (letter === validWord[index]) {
              correctCount++;
              cell.classList.add("correct");
              newCorrect.push(letter);
            } else if (validWord.includes(letter)) {
              cell.classList.add("partial");
              newPartial.push(letter);
            } else {
              newInvalid.push(letter);
              cell.classList.add("incorrect");
            }
          });

          if (correctCount === 5) {
            setGuessed(true);
            return;
          }

          setCorrectLetters([...correctLetters, ...newCorrect]);
          setPartialLetters([...partialLetters, ...newPartial]);
          setInvalidLetters([...invalidLetters, ...newInvalid]);

          setRow(currentGuess.length >= 5 ? row + 1 : row);
          setCurrentGuess("");
          setGuesses(() => {
            const newGuesses = [...guesses];
            newGuesses[row] = currentGuess;
            return newGuesses;
          });
        }

        return;
      }

      if (letter === "BACKSPACE") {
        if (currentGuess.length === 0) return;
        boardRef.current.children[row].children[
          currentGuess.length - 1
        ].textContent = "";
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + letter);
        boardRef.current.children[row].children[
          currentGuess.length
        ].textContent = letter;
      }
    },
    [currentGuess, row, col, setRow, setCurrentGuess, setGuesses, guesses],
  );

  const handleReset = () => {
    setRow(0);
    setGuessed(false);
    setValidWord(getRandomWord());
    setGuesses(Array(6).fill(""));
    setCurrentGuess("");
    setInvalidLetters([]);
    setPartialLetters([]);
    setCorrectLetters([]);
    [...boardRef.current.children].forEach((row) => {
      [...row.children].forEach((cell) => {
        cell.textContent = "";
        cell.className =
          "default text-3xl font-semibold flex items-center justify-center w-12 h-12 border-2 rounded-lg";
      });
    });
    nav("/solo");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="max-w-xl w-full flex justify-center mx-auto py-3">
        <Logo />
      </header>

      <div ref={boardRef} className="max-w-2xl w-full mx-auto py-16">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex mb-2 gap-2 justify-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className={[
                      "default col text-3xl font-semibold flex items-center justify-center w-12 h-12 border-2 rounded-lg",
                    ].join(" ")}
                  ></div>
                ))}

              {/* no word */}
              {inexistentWord && row === i && (
                <div className="absolute text-sm font-medium top-1/2 -translate-y-1/2 right-4 px-2.5 rounded-lg py-1.5 bg-rose-100 text-rose-600">
                  <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-6 border-b-6 border-transparent border-r-10 border-r-rose-100"></div>
                  This word doesn't exist!
                </div>
              )}
            </div>
          ))}
      </div>

      {row === 6 && (
        <div className="bg-black/10 backdrop-blur-sm fixed inset-0 flex items-center justify-center">
          <div className="p-6 bg-white w-full text-zinc-800 shadow-2xl max-w-md rounded-xl">
            <h1 className="text-xl font-semibold">Game Over!</h1>
            <p className="mt-4">The word is:</p>
            <h1 className="text-xl font-semibold capitalize text-emerald-600">
              {validWord.toLowerCase()}
            </h1>
            <div className="flex justify-center mt-8 gap-2">
              <div onClick={handleReset} className="w-full">
                <div className="bg-teal-600 rounded-xl mt-2 shadow-xl">
                  <button className="border-2 border-teal-600 shadow-[inset_0_2px_0_0_var(--color-teal-300)] py-2 text-sm rounded-xl bg-teal-400 text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
                    <span className="text-base transition font-medium">
                      Play again
                    </span>
                  </button>
                </div>
              </div>

              <Link to="/" className="w-full">
                <div className="bg-zinc-400 rounded-xl mt-2 shadow-xl">
                  <button className="border-2 border-zinc-400 shadow-[inset_0_2px_0_0_var(--color-white)] py-2 text-sm rounded-xl bg-white text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
                    <span className="text-base transition font-medium">
                      Back to home
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {guessed && (
        <div className="bg-black/10 backdrop-blur-sm fixed inset-0 flex items-center justify-center">
          <div className="p-6 bg-white w-full text-zinc-800 shadow-2xl max-w-md rounded-xl">
            <h1 className="text-xl font-semibold">Congratulations!</h1>
            <p className="mt-4">You guessed the word!</p>
            <h1 className="text-xl font-semibold capitalize text-emerald-600">
              {validWord.toLowerCase()}
            </h1>
            <div className="flex justify-center mt-8 gap-2">
              <div onClick={handleReset} className="w-full">
                <div className="bg-teal-600 rounded-xl mt-2 shadow-xl">
                  <button className="border-2 border-teal-600 shadow-[inset_0_2px_0_0_var(--color-teal-300)] py-2 text-sm rounded-xl bg-teal-400 text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
                    <span className="text-base transition font-medium">
                      Play again
                    </span>
                  </button>
                </div>
              </div>

              <Link to="/" className="w-full">
                <div className="bg-zinc-400 rounded-xl mt-2 shadow-xl">
                  <button className="border-2 border-zinc-400 shadow-[inset_0_2px_0_0_var(--color-white)] py-2 text-sm rounded-xl bg-white text-zinc-900 hover:-translate-y-1.5 focus:-translate-y-1.5 active:translate-y-0 transition -translate-y-2 flex items-center justify-center group px-3 w-full">
                    <span className="text-base transition font-medium">
                      Back to home
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Keyboard handleKeyPress={handleKeyPress} />
    </div>
  );
};

export default Solo;
