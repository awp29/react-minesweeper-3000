/** @jsxImportSource @emotion/react */

import { Board, EmptyCell, MineCell, TouchingCell } from "./components/board";
import { CellType, NUMBER_OF_FLAGS } from "./engine/generateBoard";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { selectNumberOfFlaggedCells } from "./engine/selectors";

function App() {
  const board = useSelector((state: RootState) => state.minesweeper.board);
  const playState = useSelector(
    (state: RootState) => state.minesweeper.gameState
  );
  const flaggedCells = useSelector(selectNumberOfFlaggedCells);

  const cells = board.flat();

  return (
    <div
      css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>RM 3000</h1>

      <p>Play State: {playState}</p>
      <p>Flags: {NUMBER_OF_FLAGS - flaggedCells}</p>

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
