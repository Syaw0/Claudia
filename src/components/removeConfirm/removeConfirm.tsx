import useCloseFloat from "../../hooks/useCloseFloat";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./removeConfirm.module.css";
import Message from "../message/message";
import useFetch from "../../hooks/useFetch";
import remove, { loaderMsg } from "../../utils/remove";
import useUpdateFileList from "../../hooks/useUpdateFileList";
import { useDispatch } from "react-redux";
import { toggleSideInfoAction } from "../../store/mycloud/mycloudStore";

const RemoveConfirmation = () => {
  const cwd = useMycloudSelector((s) => s.cwd);
  const updateList = useUpdateFileList();
  const [trigger, state, msg] = useFetch([remove], [loaderMsg]);
  const selectedFile = useMycloudSelector((s) => s.selectedFileData);
  const closeFloat = useCloseFloat();
  const dispatch = useDispatch();

  const cancel = () => {
    closeFloat();
  };

  const performRemove = async () => {
    const result = await trigger(0, cwd, selectedFile.name);
    if (result.status) {
      dispatch(toggleSideInfoAction(false));
      await updateList();
      cancel();
    }
  };

  return (
    <div data-testid="removeConfirmHolder" className={style.holder}>
      <Text className={style.head} variant="headline5">
        Are You Sure You want to remove {selectedFile.name}?!
      </Text>
      {selectedFile.isDirectory && (
        <Text className={style.subhead}>
          if you remove directory all files under it will gone!
        </Text>
      )}
      <div className={style.buttonHolder}>
        <Button
          variant="shadow"
          onClick={cancel}
          testid="removeConfirmCancelButton"
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={performRemove}
          testid="removeConfirmButton"
        >
          Remove
        </Button>
      </div>
      <Message msg={msg} type={state} />
    </div>
  );
};

export default RemoveConfirmation;
