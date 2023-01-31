import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./mycloudStore";

export const useMycloudSelector: TypedUseSelectorHook<RootState> = useSelector;
