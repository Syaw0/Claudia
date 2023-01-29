import IconDotsVertical from "../../assets/icons/iconDotsVertical";
import React, { useRef, useState } from "react";
import Text from "../typography/typography";
import style from "./menu.module.css";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandle";

interface Item {
  text: string;
  onClick: (e: any) => void;
}

interface MenuPropsType {
  items: Item[];
}

const Menu = ({ items }: MenuPropsType) => {
  const [showMenu, setShowMenu] = useState(false);
  const icon: any = useRef(null);
  useOutsideClickHandler(icon, setShowMenu);
  const handleIconClick = (e: MouseEvent) => {
    setShowMenu((s) => !s);
  };
  return (
    <div data-testid="menuHolder" className={style.holder}>
      <IconDotsVertical
        ref={icon}
        width="25"
        height="25"
        onClick={handleIconClick}
        data-testid="menuHolderIcon"
      />
      {showMenu && (
        <div
          data-testid="menuItemHolder"
          id="menu"
          className={style.itemHolder}
        >
          {items.map((item) => {
            return (
              <Text
                testid={item.text}
                className={style.item}
                key={item.text}
                onClick={item.onClick}
              >
                {item.text}
              </Text>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
