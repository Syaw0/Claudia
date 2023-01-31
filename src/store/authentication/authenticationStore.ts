import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type componentTypes =
  | "login"
  | "signup"
  | "forgetPassword"
  | "tfa"
  | "resetPassword";

interface authenticationStoreStates {
  currentComponent: componentTypes;
}

const states: authenticationStoreStates = {
  currentComponent: "login",
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
  },
});

const makeStore = () => {
  return configureStore({
    reducer: authenticateSlice.reducer,
  });
};

export const setComponentAction = authenticateSlice.actions.setComponent;
export type RootState = authenticationStoreStates;
export default makeStore;
