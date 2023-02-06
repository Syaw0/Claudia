import useFetch from "../../hooks/useFetch";
import rename, { loaderMsg } from "../../utils/rename";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import style from "./rename.module.css";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import useCloseFloat from "../../hooks/useCloseFloat";
import useUpdateFileList from "@/hooks/useUpdateFileList";
import { useDispatch } from "react-redux";
import { toggleSideInfoAction } from "../../store/mycloud/mycloudStore";

const Rename = () => {
  const updateList = useUpdateFileList();
  const closeFloat = useCloseFloat();
  const cwd = useMycloudSelector((s) => s.cwd);
  const selectedFile = useMycloudSelector((s) => s.selectedFileData);
  const [trigger, state, msg, setMsg] = useFetch([rename], [loaderMsg]);
  const [inputData, setInputData] = useState({
    renameInput: selectedFile.name,
  });
  const dispatch = useDispatch();
  const cancelRename = () => {
    closeFloat();
  };
  const performRename = async () => {
    if (!checkInputs()) {
      return;
    }
    const result = await trigger(
      0,
      cwd,
      selectedFile.name,
      inputData.renameInput
    );
    if (result.status) {
      dispatch(toggleSideInfoAction(false));
      await updateList();
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
