import ToolBarItem from "../toolbarItem/toolbarItem";
import style from "./toolbar.module.css";

interface ToolbarPropsType {
  items: Omit<ToolBarItemPropsType, "sideInfo">[];
  data?: any;
  isFromSide?: boolean;
  type: "dir" | "file" | string;
  className?: string;
}

const Toolbar = ({
  items,
  data = {},
  isFromSide = false,
  type,
  className = "",
}: ToolbarPropsType) => {
  return (
    <div data-testid="toolbarHolder" className={`${style.holder} ${className}`}>
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
