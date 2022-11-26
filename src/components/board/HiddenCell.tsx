/** @jsxImportSource @emotion/react */

interface Props {
  onClick: () => void;
}

const HiddenCell: React.FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <div
      css={{
        backgroundColor: "#424242",
        borderRadius: "2px",
      }}
      onClick={onClick}
    ></div>
  );
};

export default HiddenCell;
