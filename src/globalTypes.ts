declare global {
  interface IconTypes {
    height: string;
    width: string;
    onClick?(e: any): void;
    id?: string;
    "data-testid"?: string;
    className?: string;
  }
  interface MessageType {
    msg: string;
    type: MessageStateType;
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
    type: "dir" | "file";
    sideInfo: {
      isFromSide: boolean;
      data: any;
    };
  }
  interface CardPropsType {
    name: string;
    date: string;
    type: "file" | "dir" | string;
    size?: number;
  }
  interface FileData {
    name: string;
    size: number;
    date: string;
    isDirectory: boolean;
  }
}
export {};
