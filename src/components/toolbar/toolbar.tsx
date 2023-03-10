import ToolBarItem from "../toolbarItem/toolbarItem";
import style from "./toolbar.module.css";

interface ToolbarPropsType {
  items: Omit<ToolBarItemPropsType, "sideInfo">[];
  data?: any;
  isFromSide?: boolean;
  isDirectory: boolean;
  className?: string;
}

const Toolbar = ({
  items,
  data = {},
  isFromSide = false,
  isDirectory,
  className = "",
}: ToolbarPropsType) => {
  return (
    <div data-testid="toolbarHolder" className={`${style.holder} ${className}`}>
      {items.map((item) => {
        if (
          (isDirectory && item.type == "dir") ||
          (!isDirectory && item.type == "file")
        ) {
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
