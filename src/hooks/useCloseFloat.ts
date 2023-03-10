import { setFloatType } from "../store/mycloud/mycloudStore";
import { keyframeFadeIn, timingFadeIn } from "../styles/keyframes/translate";
import { useDispatch } from "react-redux";

const useCloseFloat = () => {
  const dispatch = useDispatch();
  return () => {
    setTimeout(() => {
      dispatch(setFloatType("none"));
    }, 400);
    const floatLayout = document.getElementById(
      "floatLayout"
    ) as HTMLDivElement;
    if (floatLayout != null) {
      floatLayout.animate(keyframeFadeIn, timingFadeIn);
    }
  };
};

export default useCloseFloat;
