import { createSlice } from "@reduxjs/toolkit";
import { Board, generateBoard } from "./generateBoard";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CellIndex {
  columnIndex: number;
  rowIndex: number;
}

export interface GameState {
  board: Board;
}

const initialState: GameState = {
  board: generateBoard(),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectEmptyCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
    },

    selectMineCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
    },

    selectTouchingCell: (state, action: PayloadAction<CellIndex>) => {
      const { columnIndex, rowIndex } = action.payload;
      state.board[columnIndex][rowIndex].visible = true;
    },
  },
});

export const { selectEmptyCell, selectMineCell, selectTouchingCell } =
  gameSlice.actions;

export default gameSlice.reducer;
