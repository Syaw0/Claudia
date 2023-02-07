import Text from "../typography/typography";
import style from "./message.module.css";

const SuccessMessage = ({ msg }: any) => {
  return (
    <div
      data-testid="successMessage"
      className={`${style.successMsg} ${style.holder}`}
    >
      <Text>{msg}</Text>
    </div>
  );
};

export default SuccessMessage;
