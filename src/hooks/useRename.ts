import { setFloatType } from "../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";

const useRename = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(setFloatType("edit"));
  };
};

export default useRename;
