/* eslint-disable react-hooks/exhaustive-deps */
import {
  insertAlert,
  replaceFileList,
  setStorageUsage,
} from "../store/mycloud/mycloudStore";
import updateFileList, { loaderMsg } from "../utils/updateFileList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "./useFetch";
import { useMycloudSelector } from "../store/mycloud/mycloudStoreHooks";

const useUpdateFileList = () => {
  const [trigger, state, msg] = useFetch([updateFileList], [loaderMsg]);
  const cwd = useMycloudSelector((s) => s.cwd);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ type: state, msg }));
    }
  }, [state]);

  const startUpdatingList = async () => {
    let result = await trigger(0, cwd);
    if (result.status) {
      const data = result.data;
      dispatch(replaceFileList(data.files));
      dispatch(setStorageUsage(data.storageUsage));
    }
  };
  return startUpdatingList;
};

export default useUpdateFileList;
