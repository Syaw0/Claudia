declare global {
  interface IconTypes {
    height: string;
    width: string;
    onClick?(e: any): void;
    id?: string;
    "data-testid"?: string;
    className?: string;
  }
  type FetchStateTypes = "error" | "success" | "pending" | "loader";
  type MessageStateType = FetchStateTypes | "warn";
  interface FetchResponse {
    status: boolean;
    msg: string;
    data?: any;
  }
  interface ToolBarItemPropsType {
    name: string;
    Icon: (props: IconTypes) => JSX.Element;
    hook: (d: any) => () => void;
    sideInfo: {
      isFromSide: boolean;
      data: any;
    };
  }
}
export {};
