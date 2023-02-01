import { toggleSelectFile } from "../store/mycloud/mycloudStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useControlSelectFileState = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const clickHandler = (e: any) => {
      const cards = document.getElementsByClassName("card");
      let res = [];
      for (let i = 0; i != cards.length; i++) {
        res.push(cards[i].contains(e.target));
      }
      const isItTrue = res.filter((s) => s);
      if (isItTrue.length == 0) {
        dispatch(toggleSelectFile(false));
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [dispatch]);
};
export default useControlSelectFileState;
