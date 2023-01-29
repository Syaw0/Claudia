import { useEffect } from "react";

const useOutsideClickHandler = (ref: any, setShow: any) => {
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
  }, [ref, setShow]);
};
export default useOutsideClickHandler;
