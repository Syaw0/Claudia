/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAlert } from "../store/mycloud/mycloudStore";
import download, { loaderMsg } from "../utils/download";

const useDownload = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([download], [loaderMsg]);
  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ msg, type: state }));
    }
  }, [state, msg, dispatch]);
  return async () => {
    const result = await trigger(0);
  };
};

export default useDownload;
