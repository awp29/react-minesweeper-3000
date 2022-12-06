/** @jsxImportSource @emotion/react */

interface Props {
  children: React.ReactNode;
}

const Label: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <label css={{ fontWeight: "bold", fontSize: "12px", marginBottom: "2px" }}>
      {children}
    </label>
  );
};

export default Label;
