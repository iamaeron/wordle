import { createStore } from "zustand";
import { getRandomWord, validWords } from "../data/validWords";

export const boardStore = createStore((set) => ({
  row: 0,
  col: 0,
  validWord: getRandomWord(),
  setValidWord: (val) => set({ validWord: val }),
  guesses: Array(6).fill(""),
  setGuesses: (val) => set({ guesses: val }),
  currentGuess: "",
  invalidLetters: [],
  partialLetters: [],
  correctLetters: [],
  setInvalidLetters: (val) => set({ invalidLetters: val }),
  setPartialLetters: (val) => set({ partialLetters: val }),
  setCorrectLetters: (val) => set({ correctLetters: val }),
  setCurrentGuess: (val) => set({ currentGuess: val }),
  setCol: (val) => set({ col: val }),
  setRow: (val) => set({ row: val }),
}));
