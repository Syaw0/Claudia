/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAlert } from "../store/mycloud/mycloudStore";
import makeCopy, { loaderMsg } from "../utils/makeCopy";
import { useMycloudSelector } from "../store/mycloud/mycloudStoreHooks";
import useUpdateFileList from "./useUpdateFileList";

const useCopy = () => {
  const dispatch = useDispatch();
  const cwd = useMycloudSelector((s) => s.cwd);
  const selectedFile = useMycloudSelector((s) => s.selectedFileData);
  const updateList = useUpdateFileList();
  const [trigger, state, msg, setMsg] = useFetch([makeCopy], [loaderMsg]);

  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ msg, type: state }));
    }
  }, [state, msg, dispatch]);
  return async () => {
    const result = await trigger(0, cwd, selectedFile.name);
    if (result.status) {
      dispatch(insertAlert({ type: "success", msg: "successfully make copy" }));
      await updateList();
    }
  };
};

export default useCopy;
