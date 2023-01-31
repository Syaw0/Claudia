import Text from "../typography/typography";
import style from "./toolbarItem.module.css";

interface ToolBarItemPropsType {
  name: string;
  Icon: (props: IconTypes) => JSX.Element;
  hook: (d: any) => () => void;
  sideInfo: {
    isFromSide: boolean;
    data: any;
  };
}

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
      <Icon width="24" height="24" />
      <Text>{name}</Text>
    </div>
  );
};

export default ToolBarItem;
