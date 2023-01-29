import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import WaitMessage from "./waitMessage";
import WarnMessage from "./warnMessage";

interface MessageType {
  msg: string;
  type: MessageStateType;
}

const Message = ({ msg, type }: MessageType) => {
  return (
    <>
      {type == "success" && <SuccessMessage msg={msg} />}
      {type == "error" && <ErrorMessage msg={msg} />}
      {type == "loader" && <WaitMessage msg={msg} />}
      {type == "warn" && <WarnMessage msg={msg} />}
    </>
  );
};

export default Message;
