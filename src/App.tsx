/** @jsxImportSource @emotion/react */

import { Board, EmptyCell, MineCell, TouchingCell } from "./components/board";
import { CellType } from "./engine/generateBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { selectNumberOfFlaggedCells } from "./engine/selectors";
import { getDifficultyConfig } from "./engine/difficulty";
import { GameState, selectDifficulty } from "./engine/minesweeperSlice";
import GameWonModal from "./components/modal/GameWonModal";
import GameOverModal from "./components/modal/GameOverModal";

function App() {
  const dispatch = useDispatch();

  const difficulty = useSelector(
    (state: RootState) => state.minesweeper.difficulty
  );

  const maxNumberOfFlags = getDifficultyConfig(difficulty).flags;

  const board = useSelector((state: RootState) => state.minesweeper.board);
  const gameState = useSelector(
    (state: RootState) => state.minesweeper.gameState
  );
  const flaggedCells = useSelector(selectNumberOfFlaggedCells);

  const cells = board.flat();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        height: "100%",
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
          width: "100%",
        }}
      >
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
        <p>TIMER</p>
        <p>Flags: {maxNumberOfFlags - flaggedCells}</p>
      </div>

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

      {/* {gameState === GameState.Won && <GameWonModal />}
      {gameState === GameState.GameOver && <GameOverModal />} */}
    </div>
  );
}

export default App;
