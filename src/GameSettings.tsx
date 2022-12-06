/** @jsxImportSource @emotion/react */

import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGameSettings } from "./engine/minesweeperSlice";
import { selectGameSettings } from "./engine/selectors";

interface Props {
  onRestartGame: () => void;
}

const GameSettings: React.FC<Props> = (props) => {
  const { onRestartGame } = props;

  const dispatch = useDispatch();

  const gameSettings = useSelector(selectGameSettings);

  const [columns, setColumns] = useState(gameSettings.columns);
  const [rows, setRows] = useState(gameSettings.rows);
  const [bombs, setBombs] = useState(gameSettings.bombs);

  return (
    <div
      css={{
        position: "absolute",
        top: "10px",
        bottom: "10px",
        right: "10px",
        left: "10px",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(updateGameSettings({ rows, columns, bombs }));
          onRestartGame();
        }}
      >
        <div css={{ display: "flex" }}>
          <input
            css={{ width: "47%" }}
            value={rows}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRows(parseInt(e.target.value));
            }}
          />

          <span css={{ flex: 1, textAlign: "center" }}>x</span>

          <input
            css={{ width: "47%" }}
            value={columns}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setColumns(parseInt(e.target.value));
            }}
          />
        </div>

        <input
          css={{ width: "100%" }}
          value={bombs}
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setBombs(parseInt(e.target.value));
          }}
        />

        <button type="submit">Restart Game</button>
      </form>
    </div>
  );
};

export default GameSettings;
