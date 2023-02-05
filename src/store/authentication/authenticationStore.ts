import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type componentTypes =
  | "login"
  | "signup"
  | "forgetPassword"
  | "tfa"
  | "resetPassword";

type SignupData = {
  name: string;
  email: string;
  password: string;
};
interface authenticationStoreStates {
  currentComponent: componentTypes;
  isReset: boolean;
  email: string;
  isSignup: boolean;
  signupData: SignupData;
}

const states: authenticationStoreStates = {
  currentComponent: "tfa",
  isReset: false,
  isSignup: false,
  signupData: {
    name: "",
    email: "",
    password: "",
  },
  email: "siaw0cpe@gmail.com",
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
    setEmail(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        email: action.payload,
      };
    },

    setIsSignup(preState, action: PayloadAction<boolean>) {
      return {
        ...preState,
        isSignup: action.payload,
      };
    },

    setSignupData(preState, action: PayloadAction<SignupData>) {
      return {
        ...preState,
        signupData: action.payload,
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
export const setEmailAction = authenticateSlice.actions.setEmail;
export const setIsSignupAction = authenticateSlice.actions.setIsSignup;
export const setSignupDataAction = authenticateSlice.actions.setSignupData;

export type RootState = authenticationStoreStates;
export default makeStore;
