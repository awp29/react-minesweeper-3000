import { RootState } from "../store";

export const selectNumberOfFlaggedCells = (state: RootState) => {
  const cells = state.minesweeper.board.flat();
  const flaggedCells = cells.filter((cell) => cell.flagged);
  return flaggedCells.length;
};

export const selectGameSettings = (state: RootState) => {
  const rows = state.minesweeper.rows;
  const columns = state.minesweeper.columns;
  const bombs = state.minesweeper.bombs;

  return {
    rows,
    columns,
    bombs,
  };
};
