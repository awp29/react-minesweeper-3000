import { RootState } from "../store";

export const selectNumberOfFlaggedCells = (state: RootState) => {
  const cells = state.minesweeper.board.flat();
  const flaggedCells = cells.filter((cell) => cell.flagged);
  return flaggedCells.length;
};
