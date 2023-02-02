import { toggleGlobalMsgOpen } from "../../store/mycloud/mycloudStore";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import { useDispatch } from "react-redux";
import IconClose from "../../assets/icons/iconClose";
import ErrorMessage from "../message/errorMessage";
import SuccessMessage from "../message/successMessage";
import WaitMessage from "../message/waitMessage";
import WarnMessage from "../message/warnMessage";
import style from "./message.module.css";

const Message = () => {
  const globalMsgData = useMycloudSelector((s) => s.globalMsg);
  const dispatch = useDispatch();
  const { type, msg } = globalMsgData;
  const close = () => {
    dispatch(toggleGlobalMsgOpen(false));
  };
  return (
    <>
      <div className={`${style.mainHolder}  ${style[type]}`}>
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
