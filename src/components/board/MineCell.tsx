/** @jsxImportSource @emotion/react */

import HiddenCell from "./HiddenCell";
import { useDispatch } from "react-redux";
import { selectMineCell } from "../../engine/minesweeperSlice";

interface Props {
  columnIndex: number;
  rowIndex: number;
  visible: boolean;
}

const EmptyCell: React.FC<Props> = (props) => {
  const { columnIndex, rowIndex, visible } = props;

  const dispatch = useDispatch();

  if (!visible) {
    return (
      <HiddenCell
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        onClick={() => {
          dispatch(selectMineCell({ columnIndex, rowIndex }));
        }}
      />
    );
  }

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#D5D2CE",
        borderRadius: "2px",
        fontWeight: "bold",
      }}
    >
      M
    </div>
  );
};

export default EmptyCell;
