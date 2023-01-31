import ToolBarItem from "../toolbarItem/toolbarItem";
import style from "./toolbar.module.css";

interface ToolbarPropsType {
  items: Omit<ToolBarItemPropsType, "sideInfo">[];
  data?: any;
  isFromSide?: boolean;
}

const Toolbar = ({
  items,
  data = {},
  isFromSide = false,
}: ToolbarPropsType) => {
  return (
    <div data-testid="toolbarHolder" className={style.holder}>
      {items.map((item) => {
        return (
          <ToolBarItem
            key={item.name}
            {...item}
            sideInfo={{ data, isFromSide }}
          />
        );
      })}
    </div>
  );
};

export default Toolbar;
