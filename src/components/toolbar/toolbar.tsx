import ToolBarItem from "../toolbarItem/toolbarItem";
import style from "./toolbar.module.css";

interface ToolbarPropsType {
  items: Omit<ToolBarItemPropsType, "sideInfo">[];
  data?: any;
  isFromSide?: boolean;
  type: "dir" | "file";
}

const Toolbar = ({
  items,
  data = {},
  isFromSide = false,
  type,
}: ToolbarPropsType) => {
  return (
    <div data-testid="toolbarHolder" className={style.holder}>
      {items.map((item) => {
        if (type === item.type) {
          return (
            <ToolBarItem
              key={item.name}
              {...item}
              sideInfo={{ data, isFromSide }}
            />
          );
        }
      })}
    </div>
  );
};

export default Toolbar;
