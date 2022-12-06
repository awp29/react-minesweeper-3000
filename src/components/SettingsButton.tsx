/** @jsxImportSource @emotion/react */

import { darken } from "polished";
import { BiCog } from "react-icons/bi";

interface Props {
  onClick: () => void;
}

const GameSettingsButton: React.FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <button
      css={{
        cursor: "pointer",
        position: "absolute",
        right: "-16px",
        top: "-10px",
        border: "none",
        backgroundColor: "#EFEFEF",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
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
      onClick={onClick}
    >
      <BiCog
        css={{ position: "relative", top: "1px" }}
        size={28}
        color="#606071"
      />
    </button>
  );
};

export default GameSettingsButton;
