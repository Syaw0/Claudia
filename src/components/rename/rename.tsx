import useFetch from "../../hooks/useFetch";
import rename, { loaderMsg } from "../../utils/rename";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import style from "./rename.module.css";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import { keyframeFadeIn, timingFadeIn } from "../../styles/keyframes/translate";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import { useDispatch } from "react-redux";
import { setFloatType } from "../../store/mycloud/mycloudStore";
import { act } from "react-dom/test-utils";

const Rename = () => {
  const dispatch = useDispatch();
  const selectedFile = useMycloudSelector((s) => s.selectedFileData);
  const [trigger, state, msg, setMsg] = useFetch([rename], [loaderMsg]);
  const [inputData, setInputData] = useState({
    renameInput: selectedFile.name,
  });
  const cancelRename = () => {
    setTimeout(() => {
      act(() => dispatch(setFloatType("none")));
    }, 1000);
    const floatLayout = document.getElementById(
      "floatLayout"
    ) as HTMLDivElement;
    if (floatLayout != null) {
      floatLayout.animate(keyframeFadeIn, timingFadeIn);
    }
  };
  const performRename = async () => {
    if (!checkInputs()) {
      return;
    }
    const result = await trigger(0);
    if (result.status) {
      cancelRename();
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      return setMsg("error", "please fill all fields");
    }
    if (inputData.renameInput === selectedFile.name) {
      return setMsg("error", "the name is same!");
    }
    return true;
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };
  return (
    <div data-testid="renameHolder" className={style.holder}>
      <TextInput
        className={style.renameInput}
        name="renameInput"
        onChange={changeHandle}
        id="renameInput"
        label="Rename"
        testId="renameInput"
        type="text"
        placeholder="enter your name "
        value={inputData.renameInput}
      />
      <div className={style.buttonHolder}>
        <Button
          testid="renameCancelButton"
          onClick={cancelRename}
          variant="shadow"
        >
          Cancel
        </Button>
        <Button testid="renameButton" onClick={performRename}>
          Rename
        </Button>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default Rename;
