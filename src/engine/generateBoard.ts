import { cloneDeep } from "lodash";

export const MAX_ROWS = 10;
export const MAX_COLUMNS = 10;
const MAX_NUMBER_OF_MINES = 10;
export const NUMBER_OF_FLAGS = 10;

export enum CellType {
  Empty,
  Mine,
  Touching,
}

interface BaseCell {
  columnIndex: number;
  rowIndex: number;
  visible: boolean;
  flagged: boolean;
}

interface EmptyCell extends BaseCell {
  type: CellType.Empty;
}

interface MineCell extends BaseCell {
  type: CellType.Mine;
}

interface TouchingCell extends BaseCell {
  type: CellType.Touching;
  numberOfTouchingMines: number;
}

export type Cell = EmptyCell | MineCell | TouchingCell;
export type Board = Cell[][];

export const generateBoard = () => {
  const emptyBoard: Board = generateEmptyBoard();
  const boardWithMines = placeMines(emptyBoard);
  const board = calculateTouchingCells(boardWithMines);

  return board;
};

function generateEmptyBoard() {
  const emptyBoard: Board = [];

  for (let i = 0; i < MAX_COLUMNS; i++) {
    const row: Cell[] = [];

    for (let j = 0; j < MAX_ROWS; j++) {
      row.push({
        columnIndex: i,
        rowIndex: j,
        type: CellType.Empty,
        visible: false,
        flagged: false,
      });
    }
    emptyBoard.push(row);
  }

  return emptyBoard;
}

function placeMines(emptyBoard: Board) {
  const board = cloneDeep(emptyBoard);

  let remainingMines = MAX_NUMBER_OF_MINES;
  while (remainingMines > 0) {
    let randomCellIndex = getRandomCellIndex();

    if (isMine(randomCellIndex.colIndex, randomCellIndex.rowIndex, board)) {
      console.log("continue");
      continue;
    }

    board[randomCellIndex.colIndex][randomCellIndex.rowIndex].type =
      CellType.Mine;

    remainingMines--;
  }

  return board;
}

function getRandomCellIndex() {
  return {
    colIndex: Math.floor(Math.random() * MAX_COLUMNS),
    rowIndex: Math.floor(Math.random() * MAX_ROWS),
  };
}

function calculateTouchingCells(boardWithMines: Board) {
  const board = cloneDeep(boardWithMines);

  for (let i = 0; i < MAX_COLUMNS; i++) {
    for (let j = 0; j < MAX_ROWS; j++) {
      if (isMine(i, j, board)) {
        continue;
      }

      let touching = 0;
      // check cells above
      if (isMine(i - 1, j - 1, board)) touching++;
      if (isMine(i, j - 1, board)) touching++;
      if (isMine(i + 1, j - 1, board)) touching++;

      // check cells adjacent
      if (isMine(i - 1, j, board)) touching++;
      if (isMine(i + 1, j, board)) touching++;

      // check cells below
      if (isMine(i - 1, j + 1, board)) touching++;
      if (isMine(i, j + 1, board)) touching++;
      if (isMine(i + 1, j + 1, board)) touching++;

      if (touching > 0) {
        const cell = board[i][j];

        board[i][j] = {
          ...cell,
          type: CellType.Touching,
          numberOfTouchingMines: touching,
        };
      }
    }
  }

  return board;
}

function isMine(colIndex: number, rowIndex: number, board: Board) {
  if (colIndex < 0 || colIndex >= MAX_COLUMNS) {
    return false;
  }

  if (rowIndex < 0 || rowIndex >= MAX_ROWS) {
    return false;
  }

  return board[colIndex][rowIndex].type === CellType.Mine;
}
