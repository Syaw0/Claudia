import { ReactNode } from "react";
import style from "./layout.module.css";

interface LayoutPropsTypes {
  leftSide: ReactNode;
  rightSide: ReactNode;
}

const Layout = ({ leftSide, rightSide }: LayoutPropsTypes) => {
  return (
    <div data-testid="layoutHolder" className={style.holder}>
      <div data-testid="layoutLeft" className={style.left}>
        {leftSide}
      </div>
      <div data-testid="layoutRight" className={style.right}>
        {rightSide}
      </div>
    </div>
  );
};

export default Layout;
