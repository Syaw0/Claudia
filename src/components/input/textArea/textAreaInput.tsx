import { ReactNode } from "react";
import style from "./textAreaInput.module.css";

interface TextInputType {
  label?: string;
  placeholder?: string;
  onChange: any;
  value: any;
  id?: string;
  testId: string;
  className?: string;
  onKeyDown?: (e: any) => void;
  name?: string;
}

const TextArea = ({
  id = "",
  label = "",
  placeholder = "",
  onChange,
  value,
  testId,
  className = "",
  onKeyDown,
  name = "",
}: TextInputType) => {
  return (
    <div onKeyDown={onKeyDown} className={`${style.holder} ${className}`}>
      {label !== "" && <label htmlFor={id}>{label}</label>}
      <textarea
        placeholder={placeholder}
        data-testid={testId}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
