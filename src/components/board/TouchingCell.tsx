/** @jsxImportSource @emotion/react */

import { useDispatch } from "react-redux";
import { selectTouchingCell } from "../../engine/minesweeperSlice";
import BaseCell, { BaseCellProps } from "./BaseCell";

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
      {numberOfTouchingMines}
    </BaseCell>
  );
};

export default TouchingCell;
