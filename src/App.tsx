/** @jsxImportSource @emotion/react */

import { Board, EmptyCell, MineCell, TouchingCell } from "./components/board";
import { CellType } from "./engine/generateBoard";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const board = useSelector((state: RootState) => state.game.board);
  const cells = board.flat();

  return (
    <div
      css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>RM 3000</h1>

      <Board>
        {cells.map((cell, index) => {
          switch (cell.type) {
            case CellType.Mine:
              return <MineCell key={`mine-cell-${index}`} {...cell} />;

            case CellType.Touching:
              return <TouchingCell key={`touching-cell-${index}`} {...cell} />;

            default:
              return <EmptyCell key={`empty-cell-${index}`} {...cell} />;
          }
        })}
      </Board>
    </div>
  );
}

export default App;
