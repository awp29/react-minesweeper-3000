/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from "react-redux";
import { flagCell } from "../../engine/minesweeperSlice";
import { RootState } from "../../store";
import { AiFillFlag } from "react-icons/ai";

interface Props {
  columnIndex: number;
  rowIndex: number;

  onClick: () => void;
}

const HiddenCell: React.FC<Props> = (props) => {
  const { columnIndex, rowIndex, onClick } = props;

  const dispatch = useDispatch();
  const flagged = useSelector(
    (state: RootState) => state.minesweeper.board[columnIndex][rowIndex].flagged
  );

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#424242",
        borderRadius: "2px",
        color: "white",
        fontWeight: "bold",
      }}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();

        dispatch(flagCell({ columnIndex, rowIndex }));
      }}
    >
      {flagged && <AiFillFlag size={30} />}
    </div>
  );
};

export default HiddenCell;
