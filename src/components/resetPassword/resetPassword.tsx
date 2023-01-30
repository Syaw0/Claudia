import useFetch from "../../hooks/useFetch";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import checkPasswordValidity from "../../utils/checkPasswordValidity";
import resetPassword, { loaderMsg } from "../../utils/resetPassword";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./resetPassword.module.css";
import checkPasswordEquality from "../../utils/checkPasswordEquality";

const ResetPassword = () => {
  const [trigger, state, msg, setMsg] = useFetch([resetPassword], [loaderMsg]);

  const [inputDate, setInputDate] = useState({
    resetPasswordForm_passwordInput: "",
    resetPasswordForm_RetypePasswordInput: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputDate((s) => ({ ...s, [name]: value }));
  };

  const loginButton = () => {
    //navigate to create Account component
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

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputDate)) {
      return setMsg("error", "please fill all fields");
    }

    if (!checkPasswordValidity(inputDate.resetPasswordForm_passwordInput)) {
      return setMsg("error", "please use 5 or more Character for password");
    }

    if (
      !checkPasswordEquality(
        inputDate.resetPasswordForm_RetypePasswordInput,
        inputDate.resetPasswordForm_passwordInput
      )
    ) {
      return setMsg("error", "passwords does not match");
    }

    return true;
  };
  return (
    <div data-testid="resetPasswordForm" className={style.holder}>
      <div className={style.top}>
        <Text className={style.headlineTypography} variant="headline4-5">
          Reset Password
        </Text>
        <Text className={style.subheadTypography}>
          Please choose a new password for your account then you must login
          again with your new password!
        </Text>

        <PasswordInput
          testId="resetPasswordForm_passwordInput"
          id="resetPasswordForm_passwordInput"
          label="Password"
          placeholder="Please write your new password "
          name="resetPasswordForm_passwordInput"
          value={inputDate.resetPasswordForm_passwordInput}
          onChange={handleChanges}
        />

        <PasswordInput
          testId="resetPasswordForm_RetypePasswordInput"
          id="resetPasswordForm_RetypePasswordInput"
          label="Retype Password"
          placeholder="Retype a password "
          name="resetPasswordForm_RetypePasswordInput"
          value={inputDate.resetPasswordForm_RetypePasswordInput}
          onChange={handleChanges}
        />
      </div>
      <div className={style.buttonHolder}>
        <Button
          onClick={loginButton}
          testid="resetPasswordForm_loginButton"
          variant="shadow"
        >
          login
        </Button>
        <Button
          loader={state == "loader"}
          onClick={next}
          testid="resetPasswordForm_nextButton"
        >
          Next
        </Button>
        <Message className={style.msg} type={state} msg={msg} />
      </div>
    </div>
  );
};

export default ResetPassword;
