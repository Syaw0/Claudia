import { ChangeEvent } from "react";
import style from "./otp.module.css";

interface OtpInputPropsType {
  len: number;
  value: string;
  setValue: any;
  className?: string;
}

const OtpInput = ({
  len = 6,
  value,
  setValue,
  className = "",
}: OtpInputPropsType) => {
  const arr = new Array(len).fill("-");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const element = e.currentTarget;
    const val = element.value;
    if (!/[0-9]{1}/.test(val)) {
      return;
    }
    const valueArr = value.split("");

    valueArr[i] = val;
    const newValue = valueArr.join("").slice(0, 6);
    setValue(newValue);
    const next = element.nextElementSibling as HTMLInputElement | null;
    if (next != null) {
      next.focus();
    }
  };

  const handleFocus = () => {
    let valueLength = value.length == 0 ? 0 : value.length;
    document
      .getElementById(
        `otpInput_${valueLength == len ? valueLength - 1 : valueLength}`
      )
      ?.focus();
  };

  const keyDownHandle = (e: any, i: number) => {
    if (e.key != "Backspace") {
      return;
    }
    e.preventDefault();
    const element = e.currentTarget as HTMLInputElement;
    const previous = element.previousElementSibling as HTMLInputElement | null;
    const valueArr = value.split("");

    valueArr[i] = "";
    const newValue = valueArr.join("").slice(0, 6);
    setValue(newValue);
    if (previous != null) {
      previous.focus();
      previous.setSelectionRange(0, 1);
    }
  };
  return (
    <div
      data-testid="otpHolder"
      onClick={handleFocus}
      className={`${style.holder} ${className}`}
    >
      {arr.map((s, i) => {
        return (
          <input
            inputMode="numeric"
            data-testid={`otpInput_${i}`}
            pattern={/[0-1]{1}/.source}
            onChange={(e) => {
              changeHandler(e, i);
            }}
            onKeyDown={(e) => {
              keyDownHandle(e, i);
            }}
            id={`otpInput_${i}`}
            className={style.otpInput}
            key={i}
            type={"text"}
            value={value.at(i) ?? ""}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
