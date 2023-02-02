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
import React, { useRef, useState } from "react";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandle";

var tappedTwice = false;

const Card = ({ type, date, name }: CardPropsType) => {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const ref: any = useRef(null);
  const draggableRef: any = useRef(null);
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

  const handleTouch = (event: any) => {
    if (!tappedTwice) {
      tappedTwice = true;
      setTimeout(function () {
        tappedTwice = false;
      }, 300);
      return false;
    }
    event.preventDefault();
    handleDoubleClick();
  };

  // TODO wrap this in hooks?

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const div = ref.current as HTMLDivElement;
    const data = e.dataTransfer.getData("text");
    const { id } = e.currentTarget;
    if (id !== JSON.parse(data).name) {
      div.style.border = "4px solid transparent";
      console.log("not-same");
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const div = ref.current as HTMLDivElement;
    const data = e.dataTransfer.getData("text");
    const { id } = e.currentTarget;
    if (id !== JSON.parse(data).name) {
      div.style.border = "4px solid var(--primary)";
    }
  };

  const dragExit = () => {
    const div = ref.current as HTMLDivElement;
    div.style.border = "4px solid transparent";
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ name, type, date, size: 0 })
    );
  };

  return (
    <div
      id={name}
      onDragOver={dragOver}
      onDrop={drop}
      onDragExit={dragExit}
      onDragStart={dragStart}
      draggable
      ref={ref}
      onClick={handleClick}
      data-testid={`cardHolder_${name}`}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouch}
      className={`${style.holder} card ${
        isSelected ? style.selectedHolder : ""
      }`}
    >
      <div
        onDragStart={(e) => {
          e.preventDefault();
        }}
        ref={draggableRef}
        className={style.draggable}
      >
        {name}
      </div>
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
