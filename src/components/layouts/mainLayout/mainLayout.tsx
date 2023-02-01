import style from "./mainLayout.module.css";

interface MainLayoutPropsType {
  leftNavbar: JSX.Element;
  topNavbar: JSX.Element;
  side: JSX.Element;
  main: JSX.Element;
}

const MainLayout = ({
  leftNavbar,
  topNavbar,
  side,
  main,
}: MainLayoutPropsType) => {
  return (
    <div className={style.holder}>
      <div className={style.navHolder}>{leftNavbar}</div>
      <div className={style.rightHolder}>
        <div className={style.topNavHolder}>{topNavbar}</div>
        <div className={style.mainHolder}>
          <div className={style.mainContentHolder}>{main}</div>
          <div className={style.mainSideHolder}>{side}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
