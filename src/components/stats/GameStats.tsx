/** @jsxImportSource @emotion/react */

interface Props {
  children: React.ReactNode;
}

const GameStats: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default GameStats;
