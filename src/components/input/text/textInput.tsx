import { KeyboardEventHandler, ReactNode } from "react";
import style from "./textInput.module.css";

interface TextInputType {
  label?: string;
  placeholder?: string;
  onChange: any;
  value: any;
  id?: string;
  type: "text" | "email" | "search";
  testId: string;
  className?: string;
  EndIcon?: ReactNode;
  onKeyDown?: (e: any) => void;
  name?: string;
}

const TextInput = ({
  id = "",
  label = "",
  placeholder = "",
  onChange,
  value,
  type,
  testId,
  className = "",
  EndIcon,
  onKeyDown,
  name = "",
}: TextInputType) => {
  return (
    <div onKeyDown={onKeyDown} className={`${style.holder} ${className}`}>
      {label !== "" && <label htmlFor={id}>{label}</label>}
      <input
        name={name}
        placeholder={placeholder}
        data-testid={testId}
        id={id}
        onChange={onChange}
        value={value}
        type={type}
      />
      {EndIcon != null && EndIcon}
    </div>
  );
};

export default TextInput;
