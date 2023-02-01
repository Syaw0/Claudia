/* eslint-disable react-hooks/exhaustive-deps */
import { toggleNavOpen } from "@/store/mycloud/mycloudStore";
import { useMycloudSelector } from "@/store/mycloud/mycloudStoreHooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useChangeViewPortWidth = () => {
  const isNavOpen = useMycloudSelector((s) => s.isNavOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1000 && !isNavOpen) {
        dispatch(toggleNavOpen(true));
      } else if (window.innerWidth <= 1000 && isNavOpen) {
        dispatch(toggleNavOpen(false));
      }
    };
    window.addEventListener("resize", handler);
    handler();
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
};

export default useChangeViewPortWidth;
