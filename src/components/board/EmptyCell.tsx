/** @jsxImportSource @emotion/react */

import HiddenCell from "./HiddenCell";
import { useDispatch } from "react-redux";
import { selectEmptyCell } from "../../engine/minesweeperSlice";

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
          dispatch(selectEmptyCell({ columnIndex, rowIndex }));
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
      }}
    ></div>
  );
};

export default EmptyCell;
