import { configureStore, createSlice } from "@reduxjs/toolkit";

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
};

const mycloudSlice = createSlice({
  name: "mycloud",
  initialState: states,
  reducers: {},
});

const makeStore = (params: typeof states) => {
  return configureStore({
    preloadedState: params,
    reducer: mycloudSlice.reducer,
  });
};

export type RootState = typeof states;
export default makeStore;
