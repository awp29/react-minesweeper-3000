/** @jsxImportSource @emotion/react */

interface Props {
  numberOfTouchingMines: number;
}

const TouchingCell: React.FC<Props> = (props) => {
  const { numberOfTouchingMines } = props;

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#D5D2CE",
        borderRadius: "2px",
      }}
      onClick={() => {
        console.log("TOUCHING!!!!!");
      }}
    >
      {numberOfTouchingMines}
    </div>
  );
};

export default TouchingCell;
