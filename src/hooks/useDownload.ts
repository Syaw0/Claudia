/* eslint-disable react-hooks/exhaustive-deps */
import { useMycloudSelector } from "../store/mycloud/mycloudStoreHooks";
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGlobalMsgData,
  toggleGlobalMsgOpen,
} from "../store/mycloud/mycloudStore";
import download, { loaderMsg } from "../utils/download";

const useDownload = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([download], [loaderMsg]);
  const selectedData = useMycloudSelector((s) => s.selectedFileData);
  const isGlobalMsgOpen = useMycloudSelector((s) => s.isGlobalMsgOpen);
  useEffect(() => {
    dispatch(setGlobalMsgData({ msg, type: state }));
    if (!isGlobalMsgOpen) {
      dispatch(toggleGlobalMsgOpen(true));
    }
  }, [state, msg, dispatch]);
  return async () => {
    const result = await trigger(0);
  };
};

export default useDownload;
