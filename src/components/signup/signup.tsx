import useFetch from "../../hooks/useFetch";
import checkEmailForm from "../../utils/checkEmailForm";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import checkPasswordValidity from "../../utils/checkPasswordValidity";
import signup, { loaderMsg } from "../../utils/signup";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./signup.module.css";
import { useDispatch } from "react-redux";
import { setComponentAction } from "../../store/authentication/authenticationStore";

const Signup = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([signup], [loaderMsg]);

  const [inputDate, setInputDate] = useState({
    signupForm_emailInput: "",
    signupForm_passwordInput: "",
    signupForm_nameInput: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputDate((s) => ({ ...s, [name]: value }));
  };

  const loginInstead = () => {
    dispatch(setComponentAction("login"));
  };
  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(0);
    if (res.status) {
      // navigate to the 2 way authentication
      dispatch(setComponentAction("tfa"));
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputDate)) {
      return setMsg("error", "please fill all fields");
    }
    if (!checkEmailForm(inputDate.signupForm_emailInput)) {
      return setMsg("error", "email is not valid");
    }
    if (!checkPasswordValidity(inputDate.signupForm_passwordInput)) {
      return setMsg("error", "please use 5 or more Character for password");
    }
    return true;
  };
  return (
    <div data-testid="signupForm" className={style.holder}>
      <div className={style.top}>
        <Text className={style.headlineTypography} variant="headline4-5">
          Welcome
        </Text>
        <Text className={style.subheadTypography}>
          let`s fill inputs to create a new claudia account
        </Text>

        <TextInput
          testId="signupForm_nameInput"
          type="text"
          id="signupForm_nameInput"
          label="Name"
          placeholder="Please write your Name "
          name="signupForm_nameInput"
          value={inputDate.signupForm_nameInput}
          onChange={handleChanges}
        />

        <TextInput
          testId="signupForm_emailInput"
          type="email"
          id="signupForm_emailInput"
          label="Email Address"
          placeholder="Please write your email address "
          name="signupForm_emailInput"
          value={inputDate.signupForm_emailInput}
          onChange={handleChanges}
        />
        <PasswordInput
          testId="signupForm_passwordInput"
          id="signupForm_passwordInput"
          label="Password"
          placeholder="Please write your account password "
          name="signupForm_passwordInput"
          value={inputDate.signupForm_passwordInput}
          onChange={handleChanges}
        />
      </div>
      <div className={style.buttonHolder}>
        <Button
          onClick={loginInstead}
          testid="signupForm_loginInsteadButton"
          variant="shadow"
        >
          login instead
        </Button>
        <Button
          loader={state == "loader"}
          onClick={next}
          testid="signupForm_nextButton"
        >
          Next
        </Button>
        <Message className={style.msg} type={state} msg={msg} />
      </div>
    </div>
  );
};

export default Signup;
