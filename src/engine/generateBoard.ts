import { cloneDeep } from "lodash";

export interface GameSettings {
  rows: number;
  columns: number;
  bombs: number;
}

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

export const generateBoard = (gameSettings: GameSettings) => {
  const emptyBoard: Board = generateEmptyBoard(gameSettings);
  const boardWithMines = placeMines(emptyBoard, gameSettings);
  const board = calculateTouchingCells(boardWithMines, gameSettings);

  return board;
};

function generateEmptyBoard(gameSettings: GameSettings) {
  const emptyBoard: Board = [];

  for (let i = 0; i < gameSettings.columns; i++) {
    const row: Cell[] = [];

    for (let j = 0; j < gameSettings.rows; j++) {
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

function placeMines(emptyBoard: Board, gameSettings: GameSettings) {
  const board = cloneDeep(emptyBoard);

  // TODO: RENAME BOMBS TO MINES
  let remainingMines = gameSettings.bombs;
  while (remainingMines > 0) {
    let randomCellIndex = getRandomCellIndex(gameSettings);

    if (
      isMine(
        randomCellIndex.colIndex,
        randomCellIndex.rowIndex,
        board,
        gameSettings
      )
    ) {
      continue;
    }

    board[randomCellIndex.colIndex][randomCellIndex.rowIndex].type =
      CellType.Mine;

    remainingMines--;
  }

  return board;
}

function getRandomCellIndex(gameSettings: GameSettings) {
  return {
    colIndex: Math.floor(Math.random() * gameSettings.columns),
    rowIndex: Math.floor(Math.random() * gameSettings.rows),
  };
}

function calculateTouchingCells(
  boardWithMines: Board,
  gameSettings: GameSettings
) {
  const board = cloneDeep(boardWithMines);

  for (let i = 0; i < gameSettings.columns; i++) {
    for (let j = 0; j < gameSettings.rows; j++) {
      if (isMine(i, j, board, gameSettings)) {
        continue;
      }

      let touching = 0;
      // check cells above
      if (isMine(i - 1, j - 1, board, gameSettings)) touching++;
      if (isMine(i, j - 1, board, gameSettings)) touching++;
      if (isMine(i + 1, j - 1, board, gameSettings)) touching++;

      // check cells adjacent
      if (isMine(i - 1, j, board, gameSettings)) touching++;
      if (isMine(i + 1, j, board, gameSettings)) touching++;

      // check cells below
      if (isMine(i - 1, j + 1, board, gameSettings)) touching++;
      if (isMine(i, j + 1, board, gameSettings)) touching++;
      if (isMine(i + 1, j + 1, board, gameSettings)) touching++;

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

function isMine(
  colIndex: number,
  rowIndex: number,
  board: Board,
  gameSettings: GameSettings
) {
  if (colIndex < 0 || colIndex >= gameSettings.columns) {
    return false;
  }

  if (rowIndex < 0 || rowIndex >= gameSettings.rows) {
    return false;
  }

  return board[colIndex][rowIndex].type === CellType.Mine;
}
