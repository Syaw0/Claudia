import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type floatTypes = "edit" | "none" | "removeConfirm" | "info" | string;

export interface PageBasicStates {
  isSideOpen: boolean;
  isFileSelected: boolean;
  selectedFileData: FileData;
  sideData: FileData;
  isNavOpen: boolean;
  floatType: floatTypes;
  alerts: MessageType[];
  fileList: FileData[];
}

const pageBasicStates: PageBasicStates = {
  isSideOpen: false,
  isFileSelected: false,
  isNavOpen: true,
  floatType: "none",
  fileList: [],
  alerts: [],
  selectedFileData: {
    name: "",
    size: 0,
    date: "",
    isDirectory: false,
  },
  sideData: {
    name: "",
    size: 0,
    date: "",
    isDirectory: false,
  },
};

interface StorageUsage {
  max: number;
  min: number;
}

const states = {
  cwd: "",
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
    setSideInfo(preState, action: PayloadAction<FileData>) {
      return {
        ...preState,
        sideData: {
          ...action.payload,
        },
      };
    },

    toggleFileSelected(preState, action: PayloadAction<boolean | null>) {
      const status =
        action.payload == null ? !preState.isSideOpen : action.payload;
      return {
        ...preState,
        isFileSelected: status,
      };
    },
    setSelectedFileData(preState, action: PayloadAction<FileData>) {
      return {
        ...preState,
        selectedFileData: action.payload,
      };
    },

    toggleNavOpen(preState, action: PayloadAction<boolean | null>) {
      const status =
        action.payload == null ? !preState.isSideOpen : action.payload;
      return {
        ...preState,
        isNavOpen: status,
      };
    },

    setFloatType(preState, action: PayloadAction<floatTypes>) {
      return {
        ...preState,
        floatType: action.payload,
      };
    },

    insertToAlerts(preState, action: PayloadAction<MessageType>) {
      return {
        ...preState,
        alerts: [...preState.alerts, action.payload],
      };
    },
    popAlert(preState, action: PayloadAction<number>) {
      let newAlerts = [...preState.alerts];
      newAlerts.splice(action.payload, 1);
      return {
        ...preState,
        alerts: newAlerts,
      };
    },
    rmAllAlerts(preState, action: PayloadAction<null | undefined>) {
      return {
        ...preState,
        alerts: [],
      };
    },
    replaceFileList(preState, action: PayloadAction<FileData[]>) {
      return {
        ...preState,
        fileList: action.payload,
      };
    },

    setStorageUsage(preState, action: PayloadAction<StorageUsage>) {
      return {
        ...preState,
        storageUsage: action.payload,
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
export const toggleSelectFile = mycloudSlice.actions.toggleFileSelected;
export const setSelectedFileData = mycloudSlice.actions.setSelectedFileData;
export const toggleNavOpen = mycloudSlice.actions.toggleNavOpen;
export const setFloatType = mycloudSlice.actions.setFloatType;

export const insertAlert = mycloudSlice.actions.insertToAlerts;
export const popAlert = mycloudSlice.actions.popAlert;
export const rmAllAlerts = mycloudSlice.actions.rmAllAlerts;

export const setStorageUsage = mycloudSlice.actions.setStorageUsage;

export const replaceFileList = mycloudSlice.actions.replaceFileList;

export type RootState = typeof states;
export default makeStore;
