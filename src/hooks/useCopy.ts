/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAlert } from "../store/mycloud/mycloudStore";
import makeCopy, { loaderMsg } from "../utils/makeCopy";

const useCopy = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([makeCopy], [loaderMsg]);

  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ msg, type: state }));
    }
  }, [state, msg, dispatch]);
  return async () => {
    const result = await trigger(0);
    if (result.status) {
      dispatch(insertAlert({ msg: "make copy successful", type: "success" }));
    }
  };
};

export default useCopy;
