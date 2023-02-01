import ToolBarItem from "./toolbarItem";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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
  return <ToolBarItem {...toolbarProps} type="file" />;
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
