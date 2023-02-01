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
  setSideInfoAction,
  toggleSideInfoAction,
} from "../../store/mycloud/mycloudStore";

const Card = ({ type, date, name }: CardPropsType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleDoubleClick = () => {
    if (type == "dir") {
      router.push(`/${name}`);
    }
  };
  const handleClick = () => {
    dispatch(setSideInfoAction({ type, date, name, size: 0 }));
    dispatch(toggleSideInfoAction(true));
  };
  return (
    <div
      data-testid={`cardHolder_${name}`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      className={style.holder}
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
