import { createSlice } from "@reduxjs/toolkit";
import { Board, Cell, CellType, generateBoard } from "./generateBoard";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Difficulty, getDifficultyConfig } from "./difficulty";

interface CellIndex {
  columnIndex: number;
  rowIndex: number;
}

enum GameState {
  Active = "Active",
  GameOver = "Game Over",
  Won = "Won",
}

export interface MinesweeperState {
  board: Board;
  gameState: GameState;
  difficulty: Difficulty;
}

const initialState: MinesweeperState = {
  board: generateBoard(Difficulty.Easy),
  gameState: GameState.Active,
  difficulty: Difficulty.Easy,
};

export const minesweeperSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectDifficulty: (state, action: PayloadAction<number>) => {
      const difficulty = action.payload;
      state.difficulty = difficulty;
      state.board = generateBoard(difficulty);
      state.gameState = GameState.Active;
    },

    selectEmptyCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      revealEmptyCells(columnIndex, rowIndex, state.board, state.difficulty);
      state.gameState = updateGameState(state.board);
    },

    selectTouchingCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
      state.gameState = updateGameState(state.board);
    },

    selectMineCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
      state.gameState = GameState.GameOver;
    },

    flagCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      const cell = state.board[columnIndex][rowIndex];
      cell.flagged = !cell.flagged;
    },
  },
});

export const {
  selectEmptyCell,
  selectMineCell,
  selectTouchingCell,
  flagCell,
  selectDifficulty,
} = minesweeperSlice.actions;

export default minesweeperSlice.reducer;

function revealEmptyCells(
  columnIndex: number,
  rowIndex: number,
  board: Board,
  difficulty: Difficulty
) {
  const difficultyConfig = getDifficultyConfig(difficulty);

  if (columnIndex < 0 || columnIndex >= difficultyConfig.maxColumns) {
    return;
  }

  if (rowIndex < 0 || rowIndex >= difficultyConfig.maxRows) {
    return;
  }

  const cell = board[columnIndex][rowIndex];
  if (cell.type === CellType.Mine) {
    return;
  }

  if (cell.type === CellType.Touching) {
    cell.visible = true;
    return;
  }

  if (cell.visible) {
    return;
  }

  cell.visible = true;

  // check cells above
  revealEmptyCells(columnIndex - 1, rowIndex - 1, board, difficulty);
  revealEmptyCells(columnIndex, rowIndex - 1, board, difficulty);
  revealEmptyCells(columnIndex + 1, rowIndex - 1, board, difficulty);

  // check middle cells
  revealEmptyCells(columnIndex - 1, rowIndex, board, difficulty);
  revealEmptyCells(columnIndex + 1, rowIndex, board, difficulty);

  // check cells below
  revealEmptyCells(columnIndex - 1, rowIndex + 1, board, difficulty);
  revealEmptyCells(columnIndex, rowIndex + 1, board, difficulty);
  revealEmptyCells(columnIndex + 1, rowIndex + 1, board, difficulty);
}

function updateGameState(board: Board) {
  const cells = board.flat();
  const hiddenCells = cells.filter((cell) => !cell.visible);

  if (everyHiddenCellIsMine(hiddenCells)) {
    return GameState.Won;
  }
  return GameState.Active;
}

function everyHiddenCellIsMine(hiddenCells: Cell[]) {
  return hiddenCells.every((cell) => cell.type === CellType.Mine);
}
