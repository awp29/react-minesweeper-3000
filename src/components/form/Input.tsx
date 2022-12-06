/** @jsxImportSource @emotion/react */

import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface Props {
  className?: string;
  value: string | number;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props) => {
  const { className, value, placeholder, type, onChange } = props;

  return (
    <input
      className={className}
      css={{
        minHeight: "2.75rem",
        width: "100%",
        padding: "8px 12px",
        borderRadius: "0.5rem",
        border: "2px solid #EFEFEF",
        fontSize: "1rem",
        "&::placeholder": {
          color: "#666666",
        },
        "&:hover": {
          boxShadow:
            "0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",
        },
      }}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
