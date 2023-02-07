import Text from "../typography/typography";
import style from "./message.module.css";

const WarnMessage = ({ msg }: any) => {
  return (
    <div
      data-testid="warnMessage"
      className={`${style.warnMsg} ${style.holder}`}
    >
      <Text>{msg}</Text>
    </div>
  );
};

export default WarnMessage;
