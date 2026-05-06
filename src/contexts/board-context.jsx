import { useContext, createContext, useState } from "react";
import { boardStore } from "../stores/board-store";
import { useStore } from "zustand";

const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  return (
    <BoardContext.Provider value={boardStore}>{children}</BoardContext.Provider>
  );
};

export default BoardContextProvider;

export const useBoardStore = (selector) =>
  useStore(useContext(BoardContext), selector);
