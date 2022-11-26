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
      }}
      onClick={() => {
        console.log("click");
      }}
    ></div>
  );
};

export default EmptyCell;
