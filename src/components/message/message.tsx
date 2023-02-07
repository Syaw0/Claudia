import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import WaitMessage from "./waitMessage";
import WarnMessage from "./warnMessage";

const Message = ({ msg, type, className = "" }: MessageType) => {
  return (
    <>
      <div className={className}>
        {type == "success" && <SuccessMessage msg={msg} />}
        {type == "error" && <ErrorMessage msg={msg} />}
        {type == "loader" && <WaitMessage msg={msg} />}
        {type == "warn" && <WarnMessage msg={msg} />}
      </div>
    </>
  );
};

export default Message;
