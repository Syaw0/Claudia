import useFetch from "../../hooks/useFetch";
import changePassword, { loaderMsg } from "../../utils/changePassword";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import Text from "../typography/typography";
import style from "./passwordSetting.module.css";
import { useDispatch } from "react-redux";
import { insertAlert } from "../../store/mycloud/mycloudStore";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import checkPasswordEquality from "../../utils/checkPasswordEquality";
import checkPasswordValidity from "../../utils/checkPasswordValidity";

const PasswordSetting = () => {
  const [trigger, state, msg] = useFetch([changePassword], [loaderMsg]);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    previousPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ type: state, msg }));
    }
  }, [dispatch, msg, state]);

  const changePass = async () => {
    if (!checkInputs()) {
      return;
    }
    const res = await trigger(0);
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      dispatch(insertAlert({ type: "error", msg: "inputs must have value" }));
      return false;
    }
    if (!checkPasswordValidity(inputData.newPassword)) {
      dispatch(
        insertAlert({
          type: "error",
          msg: "please choose password with 6 or more character",
        })
      );
      return false;
    }
    if (
      !checkPasswordEquality(inputData.retypeNewPassword, inputData.newPassword)
    ) {
      dispatch(
        insertAlert({
          type: "error",
          msg: "new password and retype is not same!",
        })
      );
      return false;
    }
    return true;
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  return (
    <div data-testid="passwordSettingHolder" className={style.holder}>
      <Text variant="headline4" className={style.headText}>
        Change Password
      </Text>

      <PasswordInput
        name="previousPassword"
        value={inputData.previousPassword}
        onChange={changeHandle}
        label="Current Password"
        placeholder="enter current password"
        id="passwordSettingCurrentPassword"
        testId="passwordSettingCurrentPassword"
      />

      <PasswordInput
        name="newPassword"
        value={inputData.newPassword}
        onChange={changeHandle}
        label="New Password"
        placeholder="enter new password"
        id="passwordSettingNewPassword"
        testId="passwordSettingNewPassword"
      />

      <PasswordInput
        name="retypeNewPassword"
        value={inputData.retypeNewPassword}
        onChange={changeHandle}
        label="Retype Password"
        placeholder="retype new password"
        id="passwordSettingRetypePassword"
        testId="passwordSettingRetypePassword"
      />

      <div className={style.buttonHolder}>
        <Button testid="passwordSettingButton" onClick={changePass}>
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordSetting;
