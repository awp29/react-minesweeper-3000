/** @jsxImportSource @emotion/react */

import React from "react";

interface Props {
  children: React.ReactNode;
}

const Board: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: "repeat(10, 1fr)",
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
