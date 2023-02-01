import { configureStore, createSlice } from "@reduxjs/toolkit";

interface PageBasicStates {
  isSideOpen: boolean;
  sideData: {
    name: string;
    size: number;
    date: string;
    type: "file" | "dir";
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
  reducers: {},
});

const makeStore = (params: Partial<typeof states>) => {
  return configureStore({
    preloadedState: { ...states, ...params },
    reducer: mycloudSlice.reducer,
  });
};

export type RootState = typeof states;
export default makeStore;
