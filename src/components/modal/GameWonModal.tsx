/** @jsxImportSource @emotion/react */

import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { newGame } from "../../engine/minesweeperSlice";
import Overlay from "./Overlay";

const GameWonModal: React.FC = () => {
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <Overlay>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div css={{ backgroundColor: "black", padding: "20px" }}>
          <h1 css={{ color: "white" }}>WON</h1>
          <button
            onClick={() => {
              dispatch(newGame());
            }}
          >
            Play Again?
          </button>
        </div>
      </div>
    </Overlay>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default GameWonModal;
