import ToolBarItem from "./toolbarItem";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

let mockClickHandle = jest.fn(() => {});

const useExampleHook = jest.fn(() => {
  return mockClickHandle;
});

const toolbarProps = {
  name: "star",
  Icon: () => <div></div>,
  hook: useExampleHook,
  type: "file",
  sideInfo: {
    isFromSide: false,
    data: null,
  },
};

const CustomComponent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <ToolBarItem {...toolbarProps} type="file" />
    </Provider>
  );
};

describe("TEST COMPONENT : ToolbarItem", () => {
  it("its render properly", () => {
    render(<CustomComponent />);
    const holder = screen.getByTestId(`toolbarItem_${toolbarProps.name}`);
    expect(holder).toBeInTheDocument();
    fireEvent.click(holder);
    expect(mockClickHandle).toBeCalledTimes(1);
  });
});
