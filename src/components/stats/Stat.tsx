/** @jsxImportSource @emotion/react */

interface Props {
  children: React.ReactNode;
}

const Stat: React.FC<Props> = (props) => {
  const { children } = props;

  return <p css={{ fontSize: "14px", fontWeight: "bold" }}>{children}</p>;
};

export default Stat;
