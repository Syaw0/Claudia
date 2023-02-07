import IconDotsVertical from "../../assets/icons/iconDotsVertical";
import React, { useRef, useState } from "react";
import style from "./menu.module.css";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandle";

interface MenuPropsType {
  toolbarHolder: JSX.Element;
}

const MenuV2 = ({ toolbarHolder }: MenuPropsType) => {
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
          {toolbarHolder}
        </div>
      )}
    </div>
  );
};

export default MenuV2;
