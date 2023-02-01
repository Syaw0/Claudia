import toolbarItems from "../../shared/toolbarItems";
import IconDirectory from "../../assets/icons/iconDirectory";
import IconFile from "../../assets/icons/iconFile";
import MenuV2 from "../menu_v2/menuV2";
import Toolbar from "../toolbar/toolbar";
import Text from "../typography/typography";
import style from "./card.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setSelectedFileData,
  setSideInfoAction,
  toggleSelectFile,
  toggleSideInfoAction,
} from "../../store/mycloud/mycloudStore";
import React, { useState } from "react";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandle";

const Card = ({ type, date, name }: CardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const ref = React.useRef(null);
  const handleDoubleClick = () => {
    if (type == "dir") {
      router.push(`/${name}`);
    }
  };
  useOutsideClickHandler(ref, setIsSelected);

  const handleClick = (e: React.MouseEvent) => {
    dispatch(toggleSelectFile(true));
    dispatch(setSelectedFileData({ type, name, date, size: 0 }));
    dispatch(setSideInfoAction({ type, date, name, size: 0 }));
    dispatch(toggleSideInfoAction(true));
    setIsSelected(true);
  };
  return (
    <div
      ref={ref}
      data-testid={`cardHolder_${name}`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      className={`${style.holder} card ${
        isSelected ? style.selectedHolder : ""
      }`}
    >
      <div data-testid={`cardHolder_${name}_top`} className={style.top}>
        {type == "file" && <IconFile width="60" height="60" />}
        {type == "dir" && <IconDirectory width="60" height="60" />}
        <MenuV2
          toolbarHolder={
            <Toolbar
              className={style.toolbarHolder}
              items={toolbarItems}
              type={type}
            />
          }
        />
      </div>
      <div data-testid={`cardHolder_${name}_bottom`} className={style.bottom}>
        <Text variant="headline6">{name}</Text>
        <Text>{date}</Text>
      </div>
    </div>
  );
};

export default Card;
