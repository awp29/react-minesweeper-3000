import { createSlice } from "@reduxjs/toolkit";
import {
  Board,
  CellType,
  generateBoard,
  MAX_COLUMNS,
  MAX_ROWS,
} from "./generateBoard";
import type { PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: MinesweeperState = {
  board: generateBoard(),
  gameState: GameState.Active,
};

export const minesweeperSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectEmptyCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      revealEmptyCells(columnIndex, rowIndex, state.board);
    },

    selectMineCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
      state.gameState = GameState.GameOver;
    },

    selectTouchingCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
    },
  },
});

export const { selectEmptyCell, selectMineCell, selectTouchingCell } =
  minesweeperSlice.actions;

export default minesweeperSlice.reducer;

function revealEmptyCells(columnIndex: number, rowIndex: number, board: Board) {
  if (columnIndex < 0 || columnIndex >= MAX_COLUMNS) {
    return;
  }

  if (rowIndex < 0 || rowIndex >= MAX_ROWS) {
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
  revealEmptyCells(columnIndex - 1, rowIndex - 1, board);
  revealEmptyCells(columnIndex, rowIndex - 1, board);
  revealEmptyCells(columnIndex + 1, rowIndex - 1, board);

  // check middle cells
  revealEmptyCells(columnIndex - 1, rowIndex, board);
  revealEmptyCells(columnIndex + 1, rowIndex, board);

  // check cells below
  revealEmptyCells(columnIndex - 1, rowIndex + 1, board);
  revealEmptyCells(columnIndex, rowIndex + 1, board);
  revealEmptyCells(columnIndex + 1, rowIndex + 1, board);
}
