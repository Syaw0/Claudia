import { setFloatType } from "../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";

const useRemoveConfirm = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(setFloatType("removeConfirm"));
  };
};

export default useRemoveConfirm;
