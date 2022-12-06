/** @jsxImportSource @emotion/react */

import { darken } from "polished";

interface Props {
  className?: string;
}

const RestartGameButton: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <button
      className={className}
      css={{
        cursor: "pointer",
        backgroundColor: "#EFEFEF",
        backgroundRepeat: "no-repeat",
        width: "100%",
        border: "2px solid #EFEFEF",
        borderRadius: "8px",
        fontSize: "20px",
        fontWeight: "bold",
        padding: "12px 0px",
        "&:hover": {
          backgroundColor: "#EFEFEF",
          boxShadow:
            "0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
        },
        "&:active": {
          backgroundColor: darken(0.1, "#EFEFEF"),
          borderColor: darken(0.1, "#EFEFEF"),
        },
      }}
      type="submit"
    >
      Restart Game
    </button>
  );
};

export default RestartGameButton;
