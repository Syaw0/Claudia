import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type componentTypes =
  | "login"
  | "signup"
  | "forgetPassword"
  | "tfa"
  | "resetPassword";

interface authenticationStoreStates {
  currentComponent: componentTypes;
  isReset: boolean;
}

const states: authenticationStoreStates = {
  currentComponent: "login",
  isReset: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: states,
  reducers: {
    setComponent(preState, action: PayloadAction<componentTypes>) {
      return {
        ...preState,
        currentComponent: action.payload,
      };
    },
    setIsReset(preState, action: PayloadAction<boolean>) {
      return {
        ...preState,
        isReset: action.payload,
      };
    },
  },
});

const makeStore = () => {
  return configureStore({
    reducer: authenticateSlice.reducer,
  });
};

export const setComponentAction = authenticateSlice.actions.setComponent;
export const setIsResetAction = authenticateSlice.actions.setIsReset;
export type RootState = authenticationStoreStates;
export default makeStore;
