import { setFloatType } from "../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";

const useCreateDirectory = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(setFloatType("createDirectory"));
  };
};

export default useCreateDirectory;
