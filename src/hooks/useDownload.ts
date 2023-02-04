/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAlert } from "../store/mycloud/mycloudStore";
import download, { loaderMsg } from "../utils/download";

const useDownload = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([download], [loaderMsg]);
  console.log(state);
  useEffect(() => {
    console.log(state);
    if (state != "pending") {
      dispatch(insertAlert({ msg, type: state }));
    }
  }, [state, msg, dispatch]);
  return async () => {
    const result = await trigger(0);
    if (result.status) {
      dispatch(insertAlert({ msg: "Download Begin", type: "success" }));
    }
  };
};

export default useDownload;
