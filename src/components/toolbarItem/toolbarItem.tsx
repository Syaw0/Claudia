import Text from "../typography/typography";
import style from "./toolbarItem.module.css";

const ToolBarItem = ({ name, Icon, hook, sideInfo }: ToolBarItemPropsType) => {
  const clickHandler = hook(sideInfo);

  return (
    <div
      data-testid={`toolbarItem_${name}`}
      onClick={() => {
        clickHandler();
      }}
      className={sideInfo.isFromSide ? style.holderSide : style.holderMenu}
    >
      <Icon className={style.icon} width="24" height="24" />
      <Text>{name}</Text>
    </div>
  );
};

export default ToolBarItem;
