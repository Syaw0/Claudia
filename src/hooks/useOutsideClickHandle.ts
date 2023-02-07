import { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";

const useOutsideClickHandler = (ref: any, setShow: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, ref, setShow]);
};
export default useOutsideClickHandler;
