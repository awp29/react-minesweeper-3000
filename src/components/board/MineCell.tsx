/** @jsxImportSource @emotion/react */

import { useDispatch } from "react-redux";
import { selectMineCell } from "../../engine/minesweeperSlice";
import BaseCell, { BaseCellProps } from "./BaseCell";
import { FaCog } from "react-icons/fa";

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
      <div
        css={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#D7263D",
          justifyContent: "space-around",
          width: "80%",
          height: "80%",
          borderRadius: "8px",
        }}
      >
        <FaCog size={30} />
      </div>
    </BaseCell>
  );
};

export default EmptyCell;
