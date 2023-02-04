/* eslint-disable react-hooks/exhaustive-deps */
import starOrUnStar, { loaderMsg } from "../utils/starOrUnStar";
import useFetch from "./useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAlert } from "../store/mycloud/mycloudStore";

const useStar = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg, setMsg] = useFetch([starOrUnStar], [loaderMsg]);

  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ msg, type: state }));
    }
  }, [state, msg, dispatch]);
  return async () => {
    const result = await trigger(0);
    if (result.status) {
      dispatch(insertAlert({ msg: "Stared", type: "success" }));
    }
  };
};

export default useStar;
