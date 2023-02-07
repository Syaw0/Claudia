import useCloseFloat from "../../hooks/useCloseFloat";
import { ChangeEvent, useState } from "react";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Text from "../typography/typography";
import style from "./createDirectory.module.css";
import useFetch from "../../hooks/useFetch";
import createDirectory, { loaderMsg } from "../../utils/createDirectory";
import checkInputsEmptiness from "../../utils/checkInputEmptiness";
import Message from "../message/message";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import useUpdateFileList from "../../hooks/useUpdateFileList";

const CreateDirectory = () => {
  const updateList = useUpdateFileList();
  const cwd = useMycloudSelector((s) => s.cwd);
  const [trigger, state, msg, setMsg] = useFetch(
    [createDirectory],
    [loaderMsg]
  );
  const [inputData, setInputData] = useState({ directoryName: "" });
  const closeFloat = useCloseFloat();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const cancel = () => {
    closeFloat();
  };

  const performCreateDirectory = async () => {
    if (!checkInputs()) {
      return;
    }
    const result = await trigger(0, inputData.directoryName, cwd);
    if (result.status) {
      await updateList();
      cancel();
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      return setMsg("error", "please fill all inputs");
    }
    return true;
  };

  return (
    <div data-testid="createDirectoryHolder" className={style.holder}>
      <Text className={style.headText} variant="headline5">
        Create Empty Directory
      </Text>
      <TextInput
        name="directoryName"
        id="createDirectoryInput"
        onChange={handleChange}
        value={inputData.directoryName}
        type="text"
        testId="createDirectoryInput"
        placeholder="write your directory name..."
      />
      <div className={style.buttonHolder}>
        <Button
          testid="createDirectoryCancelButton"
          onClick={cancel}
          variant="shadow"
        >
          Cancel
        </Button>
        <Button testid="createDirectoryButton" onClick={performCreateDirectory}>
          Create
        </Button>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default CreateDirectory;
