import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./authenticationStore";

export const useAuthenticateSelector: TypedUseSelectorHook<RootState> =
  useSelector;
