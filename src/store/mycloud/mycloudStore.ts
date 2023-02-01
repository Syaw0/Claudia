import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageBasicStates {
  isSideOpen: boolean;
  sideData: {
    name: string;
    size: number;
    date: string;
    type: "file" | "dir" | string;
  };
}

const pageBasicStates: PageBasicStates = {
  isSideOpen: false,
  sideData: {
    name: "",
    size: 0,
    date: "",
    type: "file",
  },
};

const states = {
  storageUsage: {
    max: 0,
    min: 0,
  },
  user: {
    name: "",
    profileUrl: "",
    id: "",
  },
  ...pageBasicStates,
};

const mycloudSlice = createSlice({
  name: "mycloud",
  initialState: states,
  reducers: {
    toggleSideInfo(preState, action: PayloadAction<boolean | null>) {
      const status =
        action.payload == null ? !preState.isSideOpen : action.payload;
      return {
        ...preState,
        isSideOpen: status,
      };
    },
    setSideInfo(preState, action: PayloadAction<CardPropsType>) {
      return {
        ...preState,
        sideData: {
          ...action.payload,
          size: 0,
        },
      };
    },
  },
});

const makeStore = (params: Partial<typeof states>) => {
  return configureStore({
    preloadedState: { ...states, ...params },
    reducer: mycloudSlice.reducer,
  });
};

export const toggleSideInfoAction = mycloudSlice.actions.toggleSideInfo;
export const setSideInfoAction = mycloudSlice.actions.setSideInfo;
export type RootState = typeof states;
export default makeStore;
