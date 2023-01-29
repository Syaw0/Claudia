import style from "./typography.module.css";

interface Text {
  children: any;
  variant?:
    | "headline1"
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "subhead1"
    | "subhead2"
    | "subhead3"
    | "button";
  id?: string;
  testid?: string;
  className?: string;
  as?: "span" | "a" | "p";
  onClick?: (e: any) => void;
}

const Text = ({
  children,
  variant = "subhead1",
  testid,
  id,
  className = "",
  as = "p",
  ...params
}: Text) => {
  const TypographyComponent = `${as}` as keyof JSX.IntrinsicElements;
  return (
    <TypographyComponent
      {...params}
      data-testid={testid}
      id={id}
      className={`${style.typography} ${style[variant]} ${className}`}
    >
      {children}
    </TypographyComponent>
  );
};

export default Text;
