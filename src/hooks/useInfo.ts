import { setFloatType } from "../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";

const useInfo = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(setFloatType("info"));
  };
};
export default useInfo;
