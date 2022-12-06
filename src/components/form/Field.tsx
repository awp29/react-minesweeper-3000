/** @jsxImportSource @emotion/react */

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Field: React.FC<Props> = (props) => {
  const { className, children } = props;

  return (
    <div
      className={className}
      css={{ display: "flex", flexDirection: "column" }}
    >
      {children}
    </div>
  );
};

export default Field;
