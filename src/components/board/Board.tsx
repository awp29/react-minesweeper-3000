/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from "react-redux";
import { getDifficultyConfig } from "../../engine/difficulty";
import { RootState } from "../../store";

interface Props {
  children: React.ReactNode;
}

const Board: React.FC<Props> = (props) => {
  const { children } = props;

  const difficulty = useSelector(
    (state: RootState) => state.minesweeper.difficulty
  );

  const difficultyConfig = getDifficultyConfig(difficulty);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(${difficultyConfig.maxColumns}, 1fr)`,
        gridTemplateRows: `repeat(${difficultyConfig.maxRows}, 1fr)`,
        columnGap: "2px",
        rowGap: "2px",
        width: "600px",
        height: "600px",
      }}
    >
      {children}
    </div>
  );
};

export default Board;
