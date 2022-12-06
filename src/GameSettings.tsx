/** @jsxImportSource @emotion/react */

import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Input, Label } from "./components/form";
import RestartGameButton from "./components/RestartGameButton";
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
        <div
          css={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
        >
          <Field css={{ width: "45%" }}>
            <Label>Rows</Label>
            <Input
              value={rows}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setRows(parseInt(e.target.value));
              }}
            />
          </Field>

          <span
            css={{
              position: "relative",
              top: "8px",
              flex: 1,
              textAlign: "center",
              color: "#bcbcbc",
            }}
          >
            x
          </span>

          <Field css={{ width: "45%" }}>
            <Label>Columns</Label>
            <Input
              value={columns}
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setColumns(parseInt(e.target.value));
              }}
            />
          </Field>
        </div>

        <Field css={{ marginBottom: "28px" }}>
          <Label>Bombs</Label>
          <Input
            value={bombs}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBombs(parseInt(e.target.value));
            }}
          />
        </Field>

        <RestartGameButton />
      </form>
    </div>
  );
};

export default GameSettings;
