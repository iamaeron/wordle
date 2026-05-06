import { useState } from "react";
import Keyboard from "../components/Keyboard";
import Logo from "../components/Logo";
import { useRef } from "react";
import { useBoardStore } from "../contexts/board-context";
import useKeyPress from "../hooks/use-key-press";
import { useCallback } from "react";
import { validWords } from "../data/validWords";

const Solo = () => {
  const boardRef = useRef(null);
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

  useKeyPress((key) => {
    handleKeyPress(key.toUpperCase());
  });

  const handleKeyPress = useCallback(
    (letter) => {
      if (letter === "ENTER") {
        if (currentGuess.length !== 5) return;

        if (!validWords.includes(currentGuess.toLowerCase())) {
          console.log("invalid word");
          return;
        } else {
          const currentRow = boardRef.current.children[row];
          const newCorrect = [];
          const newPartial = [];
          const newInvalid = [];

          [...currentRow.children].forEach((cell, index) => {
            const letter = currentGuess[index];
            cell.classList.remove("default");

            if (validWord.includes(letter)) {
              cell.classList.add("partial");
              newPartial.push(letter);
            } else if (letter === validWord[index]) {
              cell.classList.add("correct");
              newCorrect.push(letter);
            } else {
              newInvalid.push(letter);
              cell.classList.add("incorrect");
            }
          });

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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="max-w-xl w-full flex justify-center mx-auto py-3">
        <Logo />
      </header>

      <div ref={boardRef} className="py-16">
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
                      "default text-3xl font-semibold flex items-center justify-center w-12 h-12 border-2 rounded-lg",
                    ].join(" ")}
                  ></div>
                ))}
            </div>
          ))}
      </div>

      <Keyboard handleKeyPress={handleKeyPress} />
    </div>
  );
};

export default Solo;
