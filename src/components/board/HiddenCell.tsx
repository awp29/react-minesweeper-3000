/** @jsxImportSource @emotion/react */

import { useDispatch, useSelector } from "react-redux";
import { flagCell } from "../../engine/minesweeperSlice";
import { RootState } from "../../store";

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
      css={{ cursor: "pointer", fontSize: "20px" }}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(flagCell({ columnIndex, rowIndex }));
      }}
    >
      {flagged ? "🚧" : "⬜"}
    </div>
  );
};

export default HiddenCell;
