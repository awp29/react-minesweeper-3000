/** @jsxImportSource @emotion/react */

import { Board, EmptyCell, MineCell, TouchingCell } from "./components/board";
import { CellType } from "./engine/generateBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { selectNumberOfFlaggedCells } from "./engine/selectors";
import { getDifficultyConfig } from "./engine/difficulty";
import { selectDifficulty } from "./engine/minesweeperSlice";

function App() {
  const dispatch = useDispatch();

  const difficulty = useSelector(
    (state: RootState) => state.minesweeper.difficulty
  );

  const maxNumberOfFlags = getDifficultyConfig(difficulty).flags;

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
      <p>Flags: {maxNumberOfFlags - flaggedCells}</p>

      <select
        name="difficulty"
        id="difficulty"
        onChange={(e) => {
          const difficulty = e.target.value;
          dispatch(selectDifficulty(parseInt(difficulty)));
        }}
      >
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
      </select>

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
