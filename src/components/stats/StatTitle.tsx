/** @jsxImportSource @emotion/react */

interface Props {
  children: React.ReactNode;
}

const StatTitle: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <p css={{ fontSize: "12px", fontWeight: "bold", color: "#898989" }}>
      {children}
    </p>
  );
};

export default StatTitle;
