export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

interface DifficultyConfig {
  maxColumns: number;
  maxRows: number;
  maxMines: number;
  flags: number;
}

interface DifficultyConfigMap {
  [key: number]: DifficultyConfig;
}

const difficultyConfigMap: DifficultyConfigMap = {
  0: {
    maxColumns: 10,
    maxRows: 10,
    maxMines: 10,
    flags: 10,
  },
  1: {
    maxColumns: 20,
    maxRows: 20,
    maxMines: 40,
    flags: 40,
  },
  2: {
    maxColumns: 25,
    maxRows: 25,
    maxMines: 99,
    flags: 99,
  },
};

export const getDifficultyConfig = (difficulty: Difficulty) => {
  return difficultyConfigMap[difficulty];
};
