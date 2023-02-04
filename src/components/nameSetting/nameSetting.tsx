import useFetch from "../../hooks/useFetch";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import changeName, { loaderMsg } from "../../utils/changeName";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Text from "../typography/typography";
import style from "./nameSetting.module.css";
import { useDispatch } from "react-redux";
import { insertAlert } from "../../store/mycloud/mycloudStore";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";

const NameSetting = () => {
  const [trigger, state, msg] = useFetch([changeName], [loaderMsg]);
  const user = useMycloudSelector((s) => s.user);
  const [inputData, setInputData] = useState({ name: user.name });
  const dispatch = useDispatch();
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };
  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ type: state, msg }));
    }
  }, [dispatch, msg, state]);

  const applyChange = async () => {
    if (!checkInput()) {
      return;
    }
    const res = await trigger(0);
  };
  const checkInput = () => {
    if (!checkInputsEmptiness(inputData)) {
      dispatch(insertAlert({ type: "error", msg: "input must have value" }));
      return false;
    }

    if (user.name == inputData.name) {
      dispatch(
        insertAlert({ type: "error", msg: "the new name and previous is same" })
      );
      return false;
    }
    return true;
  };

  return (
    <div data-testid="nameSettingHolder" className={style.holder}>
      <Text variant="headline4" className={style.headText}>
        Information
      </Text>

      <TextInput
        name="name"
        onChange={changeInput}
        value={inputData.name}
        label="Name"
        testId="nameSettingInput"
        type="text"
        id="nameSettingInput"
        placeholder="enter your name"
      />

      <div className={style.buttonHolder}>
        <Button
          testid="nameSettingButton"
          variant="outlined"
          className={style.changeButton}
          onClick={applyChange}
        >
          Apply Change
        </Button>
      </div>
    </div>
  );
};

export default NameSetting;
