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
import { useDispatch } from "react-redux";
import {
  setComponentAction,
  setIsResetAction,
  setIsSignupAction,
} from "../../store/authentication/authenticationStore";
import { useAuthenticateSelector } from "../../store/authentication/authenticationStoreHooks";
import { useRouter } from "next/router";
import signup, { loaderMsg as signupLoaderMsg } from "../../utils/signup";

interface TwoFactorAuthenticationPropsType {
  resetTime?: number;
}

const TwoFactorAuthentication = ({
  resetTime = 0,
}: TwoFactorAuthenticationPropsType) => {
  const router = useRouter();
  const isReset = useAuthenticateSelector((s) => s.isReset);
  const isSignup = useAuthenticateSelector((s) => s.isSignup);
  const signupData = useAuthenticateSelector((s) => s.signupData);
  const currentEmail = useAuthenticateSelector((s) => s.email);
  const dispatch = useDispatch();

  const [trigger, state, msg, setMsg] = useFetch(
    [checkOtpToken, getAnotherAuthenticationToken, signup],
    [loaderMsg, getAnotherAuthTokenLoaderMsg, signupLoaderMsg]
  );
  const [timer, setTimer] = useState(resetTime);
  const [inputData, setInputData] = useState({
    otpValue: "",
    setOtp(value: string) {
      setInputData((s) => ({ ...s, otpValue: value }));
    },
  });

  const loginButton = () => {
    dispatch(setIsResetAction(false));
    dispatch(setIsSignupAction(false));
    dispatch(setComponentAction("login"));
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(
      0,
      inputData.otpValue,
      isReset,
      currentEmail,
      isSignup
    );
    if (res.status) {
      // if its signup do it...
      if (isSignup) {
        let signupResult = await trigger(2, signupData);
        if (!signupResult.status) {
          return;
        }
      } else if (isReset) {
        // dispatch(setIsResetAction(false));
        return dispatch(setComponentAction("resetPassword"));
      }
      router.replace("/mycloud");
      // then we must reload page and see our dashboard
    }
  };

  const getFreshCode = async () => {
    if (timer <= 0) {
      const res = await trigger(1, currentEmail);
      if (res.status) {
        setTimer(resetTime);
      }
    }
  };

  const checkInputs = () => {
    if (inputData.otpValue.length != 6) {
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
          className={style.otpHolder}
          len={6}
          value={inputData.otpValue}
          setValue={inputData.setOtp}
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
