/** @jsxImportSource @emotion/react */

import { rgba } from "polished";

interface Props {
  children: React.ReactNode;
}

const Overlay: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: rgba(0, 0, 0, 0.7),
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
