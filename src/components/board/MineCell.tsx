/** @jsxImportSource @emotion/react */

const EmptyCell: React.FC = () => {
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
      onClick={() => {
        console.log("BOOOOOOOM!!!!!");
      }}
    >
      M
    </div>
  );
};

export default EmptyCell;
