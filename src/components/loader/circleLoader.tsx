import style from "./circleLoader.module.css";

const CircleLoader = () => {
  return <span data-testid="circleLoader" className={style.loader}></span>;
};

export default CircleLoader;
