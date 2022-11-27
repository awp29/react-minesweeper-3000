import { cloneDeep } from "lodash";
import { Difficulty, getDifficultyConfig } from "./difficulty";

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

export const generateBoard = (difficulty: Difficulty) => {
  const emptyBoard: Board = generateEmptyBoard(difficulty);
  const boardWithMines = placeMines(emptyBoard, difficulty);
  const board = calculateTouchingCells(boardWithMines, difficulty);

  return board;
};

function generateEmptyBoard(difficulty: Difficulty) {
  const difficultyConfig = getDifficultyConfig(difficulty);
  const emptyBoard: Board = [];

  for (let i = 0; i < difficultyConfig.maxColumns; i++) {
    const row: Cell[] = [];

    for (let j = 0; j < difficultyConfig.maxRows; j++) {
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

function placeMines(emptyBoard: Board, difficulty: Difficulty) {
  const difficultyConfig = getDifficultyConfig(difficulty);
  const board = cloneDeep(emptyBoard);

  let remainingMines = difficultyConfig.maxMines;
  while (remainingMines > 0) {
    let randomCellIndex = getRandomCellIndex(difficulty);

    if (
      isMine(
        randomCellIndex.colIndex,
        randomCellIndex.rowIndex,
        board,
        difficulty
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

function getRandomCellIndex(difficulty: Difficulty) {
  const difficultyConfig = getDifficultyConfig(difficulty);

  return {
    colIndex: Math.floor(Math.random() * difficultyConfig.maxColumns),
    rowIndex: Math.floor(Math.random() * difficultyConfig.maxRows),
  };
}

function calculateTouchingCells(boardWithMines: Board, difficulty: Difficulty) {
  const difficultyConfig = getDifficultyConfig(difficulty);
  const board = cloneDeep(boardWithMines);

  for (let i = 0; i < difficultyConfig.maxColumns; i++) {
    for (let j = 0; j < difficultyConfig.maxRows; j++) {
      if (isMine(i, j, board, difficulty)) {
        continue;
      }

      let touching = 0;
      // check cells above
      if (isMine(i - 1, j - 1, board, difficulty)) touching++;
      if (isMine(i, j - 1, board, difficulty)) touching++;
      if (isMine(i + 1, j - 1, board, difficulty)) touching++;

      // check cells adjacent
      if (isMine(i - 1, j, board, difficulty)) touching++;
      if (isMine(i + 1, j, board, difficulty)) touching++;

      // check cells below
      if (isMine(i - 1, j + 1, board, difficulty)) touching++;
      if (isMine(i, j + 1, board, difficulty)) touching++;
      if (isMine(i + 1, j + 1, board, difficulty)) touching++;

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
  difficulty: Difficulty
) {
  const difficultyConfig = getDifficultyConfig(difficulty);

  if (colIndex < 0 || colIndex >= difficultyConfig.maxColumns) {
    return false;
  }

  if (rowIndex < 0 || rowIndex >= difficultyConfig.maxRows) {
    return false;
  }

  return board[colIndex][rowIndex].type === CellType.Mine;
}
