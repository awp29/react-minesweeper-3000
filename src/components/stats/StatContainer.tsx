/** @jsxImportSource @emotion/react */

interface Props {
  children: React.ReactNode;
}

const StatContainer: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default StatContainer;
