import Text from "../typography/typography";
import style from "./mainHolder.module.css";

interface MainHolderPropsType {
  head: any;
  subhead?: any;
  rightHead?: any;
  content: any;
}

const MainHolder = ({
  head,
  subhead = "",
  rightHead = "",
  content,
}: MainHolderPropsType) => {
  return (
    <div data-testid="mainHolder" className={style.holder}>
      <div className={style.head}>
        <div>
          <Text className={style.headText} variant="headline4-5">
            {head}
          </Text>
          {subhead}
        </div>

        <div className={style.headRight}>{rightHead}</div>
      </div>

      <div className={style.bottom}>{content}</div>
    </div>
  );
};

export default MainHolder;
