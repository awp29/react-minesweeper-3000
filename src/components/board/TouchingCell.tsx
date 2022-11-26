/** @jsxImportSource @emotion/react */

import HiddenCell from "./HiddenCell";
import { useDispatch } from "react-redux";
import { selectTouchingCell } from "../../engine/gameSlice";

interface Props {
  columnIndex: number;
  rowIndex: number;
  visible: boolean;
  numberOfTouchingMines: number;
}

const TouchingCell: React.FC<Props> = (props) => {
  const { columnIndex, rowIndex, visible, numberOfTouchingMines } = props;

  const dispatch = useDispatch();

  if (!visible) {
    return (
      <HiddenCell
        onClick={() => {
          dispatch(selectTouchingCell({ columnIndex, rowIndex }));
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
    >
      {numberOfTouchingMines}
    </div>
  );
};

export default TouchingCell;
