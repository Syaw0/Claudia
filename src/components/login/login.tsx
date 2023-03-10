import useFetch from "../../hooks/useFetch";
import checkLoginForm, { loaderMsg } from "../../utils/checkLoginForm";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./login.module.css";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import checkEmailForm from "../../utils/checkEmailForm";
import checkPasswordValidity from "../../utils/checkPasswordValidity";
import { useDispatch } from "react-redux";
import {
  setComponentAction,
  setEmailAction,
  setIsResetAction,
} from "../../store/authentication/authenticationStore";
import { useAuthenticateSelector } from "../../store/authentication/authenticationStoreHooks";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useAuthenticateSelector((s) => s.email);
  const [trigger, state, msg, setMsg] = useFetch([checkLoginForm], [loaderMsg]);
  const isReset = useAuthenticateSelector((s) => s.isReset);
  const [inputData, setInputData] = useState({
    loginForm_emailInput: "",
    loginForm_passwordInput: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const forgetPassword = () => {
    dispatch(setComponentAction("forgetPassword"));
  };
  const createAccount = () => {
    dispatch(setComponentAction("signup"));
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(0, inputData);
    if (res.status) {
      // navigate to the 2 way authentication
      if (!isReset) {
        dispatch(setComponentAction("tfa"));
      } else if (inputData.loginForm_emailInput === email) {
        dispatch(setIsResetAction(false));
        router.replace("/mycloud");
      } else if (inputData.loginForm_emailInput !== email) {
        dispatch(setComponentAction("tfa"));
        dispatch(setIsResetAction(false));
      }
      dispatch(setEmailAction(inputData.loginForm_emailInput));
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      return setMsg("error", "please fill all fields");
    }
    if (!checkEmailForm(inputData.loginForm_emailInput)) {
      return setMsg("error", "email is not valid");
    }
    if (!checkPasswordValidity(inputData.loginForm_passwordInput)) {
      return setMsg("error", "please use 5 or more Character for password");
    }
    return true;
  };
  return (
    <div data-testid="loginForm" className={style.holder}>
      <div className={style.top}>
        <Text className={style.headlineTypography} variant="headline4-5">
          Welcome Back
        </Text>
        <Text className={style.subheadTypography}>
          let`s fill inputs to log in to your account
        </Text>

        <TextInput
          testId="loginForm_emailInput"
          type="email"
          id="loginForm_emailInput"
          label="Email Address"
          placeholder="Please write your email address "
          name="loginForm_emailInput"
          value={inputData.loginForm_emailInput}
          onChange={handleChanges}
        />
        <div>
          <PasswordInput
            testId="loginForm_passwordInput"
            id="loginForm_passwordInput"
            label="Password"
            placeholder="Please write your account password "
            name="loginForm_passwordInput"
            value={inputData.loginForm_passwordInput}
            onChange={handleChanges}
          />
          <Text
            onClick={forgetPassword}
            variant="subhead2"
            testid="loginForm_forgetPasswordButton"
            className={style.forgetPassword}
          >
            forget password?
          </Text>
        </div>
      </div>

      <div className={style.buttonHolder}>
        <Button
          onClick={createAccount}
          testid="loginForm_createAccountButton"
          variant="shadow"
        >
          Create Account
        </Button>
        <Button
          loader={state == "loader"}
          onClick={next}
          testid="loginForm_nextButton"
        >
          Next
        </Button>
        <Message className={style.msg} type={state} msg={msg} />
      </div>
    </div>
  );
};

export default LoginForm;
