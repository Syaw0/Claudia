import { useState } from "react";

// ? Should i test this hook?

interface FetcherState {
  state: FetchStateTypes;
  data: any;
  run: boolean;
  msg: string;
  params: any;
  setMsg(type: FetchStateTypes, msg: string): void;
}
type Fetcher = (...params: any) => Promise<FetchResponse>;

type UseFetchReturnType = [
  (...args: any) => Promise<FetchResponse>,
  FetchStateTypes,
  string,
  (type: FetchStateTypes, msg: string) => void
];

const useFetch = (
  fetcher: Fetcher[],
  loaderMsg: string[]
): UseFetchReturnType => {
  const [state, setState] = useState<FetcherState>({
    state: "pending",
    data: null,
    run: false,
    msg: "",
    params: {},
    setMsg(type, msg) {
      setState((s) => ({ ...s, msg: msg, state: type }));
    },
  });

  const trigger = async (index: number, ...args: any) => {
    setState((s) => ({
      ...s,
      run: true,
      data: null,
      state: "loader",
      msg: loaderMsg[index],
      params: args,
    }));
    try {
      const res = await fetcher[index](args);
      if (!res.status) {
        setState((s) => ({
          ...s,
          state: "error",
          msg: res.msg,
        }));
        return {
          status: false,
          msg: res.msg,
        };
      }

      setState((s) => ({
        ...s,
        state: "success",
        msg: res.msg,
      }));
      return res;
    } catch (err) {
      setState((s) => ({
        ...s,
        state: "error",
        msg: "error in client",
      }));
      return { status: false, msg: "" };
    }
  };

  return [trigger, state.state, state.msg, state.setMsg];
};

export default useFetch;
