/** @jsxImportSource @emotion/react */

import { useDispatch } from "react-redux";
import { selectTouchingCell } from "../../engine/minesweeperSlice";
import BaseCell, { BaseCellProps } from "./BaseCell";

const numberEmojiMap: { [key: number]: string } = {
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
};

interface Props extends BaseCellProps {
  numberOfTouchingMines: number;
}

const TouchingCell: React.FC<Props> = (props) => {
  const { columnIndex, rowIndex, numberOfTouchingMines } = props;

  const dispatch = useDispatch();

  return (
    <BaseCell
      {...props}
      onClick={() => {
        dispatch(selectTouchingCell({ columnIndex, rowIndex }));
      }}
    >
      {numberEmojiMap[numberOfTouchingMines]}
    </BaseCell>
  );
};

export default TouchingCell;
