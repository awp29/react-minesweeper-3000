/** @jsxImportSource @emotion/react */

import { useDispatch } from "react-redux";
import { selectEmptyCell } from "../../engine/minesweeperSlice";
import BaseCell, { BaseCellProps } from "./BaseCell";

const EmptyCell: React.FC<BaseCellProps> = (props) => {
  const { columnIndex, rowIndex } = props;

  const dispatch = useDispatch();

  return (
    <BaseCell
      {...props}
      onClick={() => {
        dispatch(selectEmptyCell({ columnIndex, rowIndex }));
      }}
    ></BaseCell>
  );
};

export default EmptyCell;
