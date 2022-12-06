/** @jsxImportSource @emotion/react */

import { darken } from "polished";
import { useDispatch, useSelector } from "react-redux";
import { GameState, newGame } from "../engine/minesweeperSlice";
import { RootState } from "../store";

interface Props {
  className?: string;
}

const NewGameButton: React.FC<Props> = (props) => {
  const { className } = props;

  const dispatch = useDispatch();
  const gameState = useSelector(
    (state: RootState) => state.minesweeper.gameState
  );

  return (
    <button
      className={className}
      css={{
        cursor: "pointer",
        backgroundColor: "transparent",
        backgroundRepeat: "no-repeat",
        width: "100%",
        border: "2px solid #EFEFEF",
        borderRadius: "8px",
        fontSize: "32px",
        padding: "4px 0px",
        "&:hover": {
          backgroundColor: "#EFEFEF",
          boxShadow:
            "0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
        },
        "&:active": {
          backgroundColor: darken(0.1, "#EFEFEF"),
          borderColor: darken(0.1, "#EFEFEF"),
        },
      }}
      onClick={() => {
        dispatch(newGame());
      }}
    >
      {gameState === GameState.Active && "😀"}
      {gameState === GameState.GameOver && "🤯"}
      {gameState === GameState.Won && "😎"}
    </button>
  );
};

export default NewGameButton;
