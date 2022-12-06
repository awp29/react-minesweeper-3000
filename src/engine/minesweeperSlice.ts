import { createSlice } from "@reduxjs/toolkit";
import {
  Board,
  Cell,
  CellType,
  GameSettings,
  generateBoard,
} from "./generateBoard";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CellIndex {
  columnIndex: number;
  rowIndex: number;
}

export enum GameState {
  Active = "Active",
  GameOver = "Game Over",
  Won = "Won",
}

export interface MinesweeperState {
  board: Board;
  gameState: GameState;
  moves: number;
  rows: number;
  columns: number;
  bombs: number;
}

const initialGameSettings = {
  columns: 20,
  rows: 20,
  bombs: 50,
};

const initialState: MinesweeperState = {
  board: generateBoard(initialGameSettings),
  gameState: GameState.Active,
  moves: 0,
  rows: initialGameSettings.rows,
  columns: initialGameSettings.columns,
  bombs: initialGameSettings.bombs,
};

export const minesweeperSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newGame: (state) => {
      state.board = generateBoard({
        rows: state.rows,
        columns: state.columns,
        bombs: state.bombs,
      });
      state.gameState = GameState.Active;
      state.moves = 0;
    },

    selectEmptyCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      revealEmptyCells(columnIndex, rowIndex, state.board, {
        columns: state.columns,
        rows: state.rows,
      });
      state.gameState = updateGameState(state.board);
      state.moves++;
    },

    selectTouchingCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
      state.gameState = updateGameState(state.board);
      state.moves++;
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

    updateGameSettings: (state, action: PayloadAction<GameSettings>) => {
      const { rows, columns, bombs } = action.payload;
      state.rows = rows;
      state.columns = columns;
      state.bombs = bombs;
      state.gameState = GameState.Active;
      state.moves = 0;
      state.board = generateBoard({ rows, columns, bombs });
    },
  },
});

export const {
  newGame,
  selectEmptyCell,
  selectMineCell,
  selectTouchingCell,
  flagCell,
  updateGameSettings,
} = minesweeperSlice.actions;

export default minesweeperSlice.reducer;

function revealEmptyCells(
  columnIndex: number,
  rowIndex: number,
  board: Board,
  boardSize: { columns: number; rows: number }
) {
  if (columnIndex < 0 || columnIndex >= boardSize.columns) {
    return;
  }

  if (rowIndex < 0 || rowIndex >= boardSize.rows) {
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
  revealEmptyCells(columnIndex - 1, rowIndex - 1, board, boardSize);
  revealEmptyCells(columnIndex, rowIndex - 1, board, boardSize);
  revealEmptyCells(columnIndex + 1, rowIndex - 1, board, boardSize);

  // check middle cells
  revealEmptyCells(columnIndex - 1, rowIndex, board, boardSize);
  revealEmptyCells(columnIndex + 1, rowIndex, board, boardSize);

  // check cells below
  revealEmptyCells(columnIndex - 1, rowIndex + 1, board, boardSize);
  revealEmptyCells(columnIndex, rowIndex + 1, board, boardSize);
  revealEmptyCells(columnIndex + 1, rowIndex + 1, board, boardSize);
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
