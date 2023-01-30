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

const ForgetPassword = () => {
  const [trigger, state, msg, setMsg] = useFetch([forgetPassword], loaderMsg);

  const [inputDate, setInputDate] = useState({
    forgetPasswordForm_emailInput: "",
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
    if (!checkEmailForm(inputDate.forgetPasswordForm_emailInput)) {
      return setMsg("error", "email is not valid");
    }
    return true;
  };
  return (
    <div data-testid="forgetPasswordForm" className={style.holder}>
      <Text className={style.headlineTypography} variant="headline4-5">
        Forget Password
      </Text>
      <Text className={style.subheadTypography}>
        please enter your email , we send you a code to ensure its your account
        .
      </Text>

      <TextInput
        testId="forgetPasswordForm_emailInput"
        type="email"
        id="forgetPasswordForm_emailInput"
        label="Email Address"
        placeholder="Please write your email address "
        name="forgetPasswordForm_emailInput"
        value={inputDate.forgetPasswordForm_emailInput}
        onChange={handleChanges}
      />

      <div className={style.buttonHolder}>
        <Button
          onClick={loginButton}
          testid="forgetPasswordForm_createAccountButton"
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
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default ForgetPassword;
