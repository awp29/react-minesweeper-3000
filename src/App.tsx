/** @jsxImportSource @emotion/react */

import { Board, EmptyCell, MineCell, TouchingCell } from "./components/board";
import { CellType, generateBoard } from "./engine/generateBoard";

function App() {
  const board = generateBoard();
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
              return <MineCell key={`mine-cell-${index}`} />;

            case CellType.Touching:
              return (
                <TouchingCell
                  key={`touching-cell-${index}`}
                  numberOfTouchingMines={cell.numberOfTouchingMines}
                />
              );

            default:
              return <EmptyCell key={`empty-cell-${index}`} />;
          }
        })}
      </Board>
    </div>
  );
}

export default App;
