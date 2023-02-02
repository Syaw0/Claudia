import Message from "./message";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";

const CustomParent = ({ type, msg }: any) => {
  return (
    <Provider store={makeStore({ globalMsg: { msg, type } })}>
      <Message />
    </Provider>
  );
};

describe("Component Test : Message", () => {
  it("Message type : success message", () => {
    render(<CustomParent type="success" msg="this is success msg" />);
    const successMsg = screen.getByTestId("successMessage");
    expect(successMsg).toBeInTheDocument();
    expect(successMsg).toHaveTextContent("this is success msg");
  });

  it("Message type : error message", () => {
    render(<CustomParent type="error" msg="this is error msg" />);
    const successMsg = screen.getByTestId("errorMessage");
    expect(successMsg).toBeInTheDocument();
    expect(successMsg).toHaveTextContent("this is error msg");
  });

  it("Message type : warn message", () => {
    render(<CustomParent type="warn" msg="this is warn msg" />);
    const successMsg = screen.getByTestId("warnMessage");
    expect(successMsg).toBeInTheDocument();
    expect(successMsg).toHaveTextContent("this is warn msg");
  });

  it("Message type : warn message", () => {
    render(<CustomParent type="loader" msg="this is loader msg" />);
    const successMsg = screen.getByTestId("waitMessage");
    expect(successMsg).toBeInTheDocument();
    expect(successMsg).toHaveTextContent("this is loader msg");
  });
});
