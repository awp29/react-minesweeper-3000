/** @jsxImportSource @emotion/react */

import { darken } from "polished";
import HiddenCell from "./HiddenCell";

export interface BaseCellProps {
  className?: string;
  columnIndex: number;
  rowIndex: number;
  visible: boolean;
}

interface Props extends BaseCellProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const BaseCell: React.FC<Props> = (props) => {
  const { className, columnIndex, rowIndex, visible, children, onClick } =
    props;

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
      className={className}
      css={{
        fontSize: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default BaseCell;
