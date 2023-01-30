import CircleLoader from "../loader/circleLoader";
import style from "./button.module.css";

interface ButtonType {
  children: any;
  variant?: "contained" | "outlined" | "shadow";
  color?: "primary" | "secondary" | "tertiary";
  onClick?: any;
  id?: string;
  testid?: string;
  StartIcon?: (params: IconTypes) => JSX.Element;
  EndIcon?: (params: IconTypes) => JSX.Element;
  loader?: boolean;
  disabled?: boolean;
  className?: string;
}
const Button = ({
  children,
  variant = "contained",
  color = "primary",
  testid,
  id,
  onClick,
  StartIcon,
  EndIcon,
  disabled = false,
  loader = false,
  className = "",
}: ButtonType) => {
  return (
    <button
      disabled={disabled}
      data-testid={testid}
      id={id}
      onClick={onClick}
      className={`${style.button} ${style[color]} ${style[variant]} ${className} `}
    >
      {loader ? (
        <CircleLoader />
      ) : (
        <>
          {StartIcon != null && (
            <StartIcon
              className={style.leftIcon}
              data-testid={testid + "-startIcon"}
              height="20"
              width="20"
            />
          )}
          {children}
          {EndIcon != null && (
            <EndIcon
              className={style.rightIcon}
              data-testid={testid + "-endIcon"}
              height="20"
              width="20"
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
