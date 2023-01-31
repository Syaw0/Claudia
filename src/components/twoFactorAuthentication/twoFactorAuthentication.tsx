import useFetch from "../../hooks/useFetch";
import checkOtpToken, { loaderMsg } from "../../utils/checkOtpToken";
import { useState } from "react";
import Button from "../button/button";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./twoFactorAuthentication.module.css";
import OtpInput from "../input/otp/otp";
import Timer from "../timer/timer";
import getAnotherAuthenticationToken, {
  getAnotherAuthTokenLoaderMsg,
} from "../../utils/getAnotherAuthenticationToken";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";
import { setComponentAction } from "../../store/authentication/authenticationStore";

interface TwoFactorAuthenticationPropsType {
  resetTime?: number;
}

const TwoFactorAuthentication = ({
  resetTime = 120,
}: TwoFactorAuthenticationPropsType) => {
  const dispatch = useDispatch();

  const [trigger, state, msg, setMsg] = useFetch(
    [checkOtpToken, getAnotherAuthenticationToken],
    [loaderMsg, getAnotherAuthTokenLoaderMsg]
  );
  const [timer, setTimer] = useState(resetTime);
  const [inputDate, setInputDate] = useState({
    otpValue: "",
    setOtp(value: string) {
      setInputDate((s) => ({ ...s, otpValue: value }));
    },
  });

  const loginButton = () => {
    dispatch(setComponentAction("login"));
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(0);
    if (res.status) {
      // navigate to the 2 way authentication
    }
  };

  const getFreshCode = async () => {
    if (timer <= 0) {
      const res = await trigger(1);
      if (res.status) {
        act(() => setTimer(resetTime));
      }
    }
  };

  const checkInputs = () => {
    if (inputDate.otpValue.length != 6) {
      return setMsg("error", "please fill all fields");
    }
    return true;
  };
  return (
    <div data-testid="tfaForm" className={style.holder}>
      <div className={style.top}>
        <Text className={style.headlineTypography} variant="headline4-5">
          Ensure its your account
        </Text>
        <Text className={style.subheadTypography}>
          we just send email to your email address , enter the code that we send
          ! you have just 3 times to try , after that the code is outdated.{" "}
          <Text
            testid="tfaForm_getFreshCode"
            as="span"
            onClick={getFreshCode}
            className={style.getFreshCode}
          >
            get fresh code
          </Text>
          <Timer setTime={setTimer} time={timer} />
        </Text>

        <OtpInput
          len={6}
          value={inputDate.otpValue}
          setValue={inputDate.setOtp}
        />
      </div>
      <div className={style.buttonHolder}>
        <Button
          onClick={loginButton}
          testid="tfaForm_LoginButton"
          variant="shadow"
        >
          Login Again
        </Button>
        <Button
          loader={state == "loader"}
          onClick={next}
          testid="tfaForm_nextButton"
        >
          Next
        </Button>
        <Message className={style.msg} type={state} msg={msg} />
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
