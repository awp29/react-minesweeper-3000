/** @jsxImportSource @emotion/react */

import { darken } from "polished";
import HiddenCell from "./HiddenCell";

export interface BaseCellProps {
  columnIndex: number;
  rowIndex: number;
  visible: boolean;
}

interface Props extends BaseCellProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const BaseCell: React.FC<Props> = (props) => {
  const { columnIndex, rowIndex, visible, children, onClick } = props;

  const evenCell = (columnIndex + rowIndex) % 2 === 0;

  if (!visible) {
    return (
      <HiddenCell
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: evenCell ? "#EBE8E5" : darken(0.1, "#EBE8E5"),
        borderRadius: "4px",
        fontWeight: "bold",
      }}
    >
      {children}
    </div>
  );
};

export default BaseCell;
