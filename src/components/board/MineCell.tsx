/** @jsxImportSource @emotion/react */

import { useDispatch } from "react-redux";
import { selectMineCell } from "../../engine/minesweeperSlice";
import BaseCell, { BaseCellProps } from "./BaseCell";

const EmptyCell: React.FC<BaseCellProps> = (props) => {
  const { columnIndex, rowIndex } = props;

  const dispatch = useDispatch();

  return (
    <BaseCell
      {...props}
      onClick={() => {
        dispatch(selectMineCell({ columnIndex, rowIndex }));
      }}
    >
      💣
    </BaseCell>
  );
};

export default EmptyCell;
