import { setFloatType } from "../store/mycloud/mycloudStore";
import { keyframeFadeIn, timingFadeIn } from "../styles/keyframes/translate";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";

const useCloseFloat = () => {
  const dispatch = useDispatch();
  return () => {
    setTimeout(() => {
      act(() => dispatch(setFloatType("none")));
    }, 1000);
    const floatLayout = document.getElementById(
      "floatLayout"
    ) as HTMLDivElement;
    if (floatLayout != null) {
      floatLayout.animate(keyframeFadeIn, timingFadeIn);
    }
  };
};

export default useCloseFloat;
