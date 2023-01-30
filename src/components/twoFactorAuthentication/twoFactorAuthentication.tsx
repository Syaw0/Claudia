import useFetch from "../../hooks/useFetch";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import forgetPassword, { loaderMsg } from "../../utils/forgetPassword";
import { useEffect, useState } from "react";
import Button from "../button/button";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./twoFactorAuthentication.module.css";
import OtpInput from "../input/otp/otp";
import Timer from "../timer/timer";

const TwoFactorAuthentication = () => {
  const [trigger, state, msg, setMsg] = useFetch(forgetPassword, loaderMsg);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    setTimer(120);
  }, []);
  const [inputDate, setInputDate] = useState({
    otpValue: "",
    setOtp(value: string) {
      setInputDate((s) => ({ ...s, otpValue: value }));
    },
  });

  const loginButton = () => {
    //navigate to create Account component
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger();
    if (res.status) {
      // navigate to the 2 way authentication
    }
  };

  const getFreshCode = () => {
    if (timer < 0) {
      console.log("fetch for new code");
      setTimer(120);
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
      <Text className={style.headlineTypography} variant="headline4-5">
        Ensure its your account
      </Text>
      <Text className={style.subheadTypography}>
        we just send email to your email address , enter the code that we send !
        you have just 3 times to try , after that the code is outdated.{" "}
        <Text as="span" onClick={getFreshCode} className={style.getFreshCode}>
          get fresh code
        </Text>
        <Timer setTime={setTimer} time={timer} />
      </Text>

      <OtpInput
        len={6}
        value={inputDate.otpValue}
        setValue={inputDate.setOtp}
      />

      <div className={style.buttonHolder}>
        <Button
          onClick={loginButton}
          testid="tfaForm_createAccountButton"
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
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default TwoFactorAuthentication;
