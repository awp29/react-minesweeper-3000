/** @jsxImportSource @emotion/react */

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  children: React.ReactNode;
}

const Board: React.FC<Props> = (props) => {
  const { children } = props;

  const boardSize = useSelector((state: RootState) => {
    return {
      columns: state.minesweeper.columns,
      rows: state.minesweeper.rows,
    };
  });

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize.columns}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize.rows}, 1fr)`,
        columnGap: "10px",
        width: "fit-content",
      }}
    >
      {children}
    </div>
  );
};

export default Board;
