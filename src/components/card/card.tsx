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
  insertAlert,
  setSelectedFileData,
  setSideInfoAction,
  toggleSelectFile,
  toggleSideInfoAction,
} from "../../store/mycloud/mycloudStore";
import React, { useEffect, useRef, useState } from "react";
import useOutsideClickHandler from "../../hooks/useOutsideClickHandle";
import useFetch from "../../hooks/useFetch";
import move, { loaderMsg } from "../../utils/move";
import useUpdateFileList from "../../hooks/useUpdateFileList";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";

var tappedTwice = false;

const Card = ({ isDirectory, date, name, size }: FileData) => {
  const cwd = useMycloudSelector((s) => s.cwd);
  const updateList = useUpdateFileList();
  const [trigger, state, msg] = useFetch([move], [loaderMsg]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ msg, type: state }));
    }
  }, [dispatch, msg, state]);

  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const ref: any = useRef(null);
  const draggableRef: any = useRef(null);

  const handleDoubleClick = () => {
    if (isDirectory) {
      router.push(location.pathname + `/${name}`);
    }
  };

  useOutsideClickHandler(ref, setIsSelected);

  const handleClick = (e: React.MouseEvent) => {
    dispatch(toggleSelectFile(true));
    dispatch(setSelectedFileData({ isDirectory, name, date, size }));
    dispatch(setSideInfoAction({ isDirectory, date, name, size }));
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

  const drop = async (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDirectory) {
      return;
    }
    e.preventDefault();
    const div = ref.current as HTMLDivElement;
    const data = e.dataTransfer.getData("text");
    const init = JSON.parse(data);
    if (name !== init.name) {
      div.classList.replace(style.selectedHolder, style.notSelectedHolder);
      // now we can do operate on the move

      dispatch(insertAlert({ msg: "moving files...", type: "loader" }));

      const result = await trigger(0, cwd, init.name, name);
      if (result.status) {
        updateList();
        dispatch(toggleSideInfoAction(false));
      }
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const div = ref.current as HTMLDivElement;
    const data = e.dataTransfer.getData("text");
    if (name !== JSON.parse(data).name && isDirectory) {
      if (div.classList.contains(style.notSelectedHolder)) {
        div.classList.replace(style.notSelectedHolder, style.selectedHolder);
      } else {
        div.classList.add(style.selectedHolder);
      }
    }
  };

  const dragExit = () => {
    const div = ref.current as HTMLDivElement;
    div.classList.replace(style.selectedHolder, style.notSelectedHolder);
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ name, isDirectory, date, size: 0 })
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
        {!isDirectory && <IconFile width="60" height="60" />}
        {isDirectory && <IconDirectory width="60" height="60" />}
        <MenuV2
          toolbarHolder={
            <Toolbar
              className={style.toolbarHolder}
              items={toolbarItems}
              isDirectory={isDirectory}
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
