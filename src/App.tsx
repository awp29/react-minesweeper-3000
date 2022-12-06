/** @jsxImportSource @emotion/react */

import { Board, EmptyCell, MineCell, TouchingCell } from "./components/board";
import { CellType } from "./engine/generateBoard";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { selectNumberOfFlaggedCells } from "./engine/selectors";
import NewGameButton from "./components/NewGameButton";
import { GameStats, Stat, StatContainer, StatTitle } from "./components/stats";
import { useState } from "react";
import GameSettings from "./GameSettings";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const numberOfBombs = useSelector(
    (state: RootState) => state.minesweeper.bombs
  );

  const board = useSelector((state: RootState) => state.minesweeper.board);
  const flaggedCells = useSelector(selectNumberOfFlaggedCells);
  const moves = useSelector((state: RootState) => state.minesweeper.moves);

  const cells = board.flat();

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "60px",
      }}
    >
      <div
        css={{
          position: "relative",
          background: "#EFEFEF",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <div css={{ visibility: showSettings ? "hidden" : "visible" }}>
          <div
            css={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <button
              css={{ position: "absolute", right: "-40px", top: "-6px" }}
              onClick={() => {
                setShowSettings(true);
              }}
            >
              SETTINGS
            </button>

            <NewGameButton css={{ marginBottom: "20px" }} />

            <Board>
              {cells.map((cell, index) => {
                switch (cell.type) {
                  case CellType.Mine:
                    return <MineCell key={`mine-cell-${index}`} {...cell} />;
                  case CellType.Touching:
                    return (
                      <TouchingCell key={`touching-cell-${index}`} {...cell} />
                    );
                  default:
                    return <EmptyCell key={`empty-cell-${index}`} {...cell} />;
                }
              })}
            </Board>
          </div>
          <GameStats>
            <StatContainer>
              <Stat>{numberOfBombs - flaggedCells}</Stat>
              <StatTitle>BOMBS</StatTitle>
            </StatContainer>

            <StatContainer>
              <Stat>{moves}</Stat>
              <StatTitle>MOVES</StatTitle>
            </StatContainer>

            <StatContainer>
              <Stat>0.00</Stat>
              <StatTitle>TIME</StatTitle>
            </StatContainer>
          </GameStats>
        </div>

        {showSettings && (
          <GameSettings
            onRestartGame={() => {
              setShowSettings(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
