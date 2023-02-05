import useFetch from "../../hooks/useFetch";
import checkEmailForm from "../../utils/checkEmailForm";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import forgetPassword, { loaderMsg } from "../../utils/forgetPassword";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./forgetPassword.module.css";
import { useDispatch } from "react-redux";
import {
  setComponentAction,
  setEmailAction,
  setIsResetAction,
} from "../../store/authentication/authenticationStore";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([forgetPassword], [loaderMsg]);

  const [inputData, setInputData] = useState({
    forgetPasswordForm_emailInput: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const loginButton = () => {
    dispatch(setComponentAction("login"));
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(0, {
      email: inputData.forgetPasswordForm_emailInput,
    });
    if (res.status) {
      dispatch(setEmailAction(inputData.forgetPasswordForm_emailInput));
      // navigate to the 2 way authentication
      dispatch(setComponentAction("tfa"));
      dispatch(setIsResetAction(true));
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      return setMsg("error", "please fill all fields");
    }
    if (!checkEmailForm(inputData.forgetPasswordForm_emailInput)) {
      return setMsg("error", "email is not valid");
    }
    return true;
  };
  return (
    <div data-testid="forgetPasswordForm" className={style.holder}>
      <div className={style.top}>
        <Text className={style.headlineTypography} variant="headline4-5">
          Forget Password
        </Text>
        <Text className={style.subheadTypography}>
          please enter your email , we send you a code to ensure its your
          account .
        </Text>

        <TextInput
          testId="forgetPasswordForm_emailInput"
          type="email"
          id="forgetPasswordForm_emailInput"
          label="Email Address"
          placeholder="Please write your email address "
          name="forgetPasswordForm_emailInput"
          value={inputData.forgetPasswordForm_emailInput}
          onChange={handleChanges}
        />
      </div>

      <div className={style.buttonHolder}>
        <Button
          onClick={loginButton}
          testid="forgetPasswordForm_loginButton"
          variant="shadow"
        >
          Login
        </Button>
        <Button
          loader={state == "loader"}
          onClick={next}
          testid="forgetPasswordForm_nextButton"
        >
          Next
        </Button>
        <Message className={style.msg} type={state} msg={msg} />
      </div>
    </div>
  );
};

export default ForgetPassword;
