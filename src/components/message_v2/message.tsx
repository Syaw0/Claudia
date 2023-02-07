import { popAlert } from "../../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";
import IconClose from "../../assets/icons/iconClose";
import ErrorMessage from "../message/errorMessage";
import SuccessMessage from "../message/successMessage";
import WaitMessage from "../message/waitMessage";
import WarnMessage from "../message/warnMessage";
import style from "./message.module.css";

interface X {
  id: number;
}

const Message = ({ msg, type, id }: MessageType & X) => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(popAlert(id));
  };
  return (
    <>
      <div
        data-testid="msgHolder"
        className={`${style.mainHolder}  ${style[type]}`}
      >
        {type == "success" && <SuccessMessage msg={msg} />}
        {type == "error" && <ErrorMessage msg={msg} />}
        {type == "loader" && <WaitMessage msg={msg} />}
        {type == "warn" && <WarnMessage msg={msg} />}
        <div
          data-testid="closeIcon"
          onClick={close}
          className={style.closeIcon}
        >
          <IconClose width="24" height="24" />
        </div>
      </div>
    </>
  );
};

export default Message;
