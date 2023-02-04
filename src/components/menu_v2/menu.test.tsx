import Menu from "./menuV2";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toolbar from "../toolbar/toolbar";
import toolbarItems from "../../shared/toolbarItems";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

const mockSetTimeout = jest.spyOn(window, "setTimeout");
mockSetTimeout.mockImplementationOnce(
  (callback: (args: void) => void, ms?: number | undefined) => {
    type x = ReturnType<typeof setTimeout>;
    callback();
    //  @ts-ignore
    let x: any = "" as x;
    return x;
  }
);

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <Menu toolbarHolder={<Toolbar items={toolbarItems} type="dir" />} />
    </Provider>
  );
};

describe("Component Test : Menu", () => {
  it("test if component render correctly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("menuHolder")).toBeInTheDocument();

    let itemHolder;
    try {
      itemHolder = screen.getByTestId("menuItemHolder");
    } catch (err) {}
    expect(itemHolder).toBeUndefined();
  });

  it("if click on the icon menu is showed", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("menuHolder")).toBeInTheDocument();
    let itemHolder;
    try {
      itemHolder = screen.getByTestId("menuItemHolder");
    } catch (err) {}
    expect(itemHolder).toBeUndefined();
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    expect(screen.getByTestId("toolbarHolder")).toBeInTheDocument();
    itemHolder = screen.getByTestId("menuItemHolder");
    expect(itemHolder).toBeInTheDocument();
  });

  it("if click on outside of menu , menu will close", () => {
    render(<CustomParent />);
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    fireEvent.click(document);

    let itemHolder;
    try {
      itemHolder = screen.getByTestId("menuItemHolder");
    } catch (err) {}
    expect(itemHolder).toBeUndefined();
  });
  it("if click on icon ,if menu is open ,so close it", () => {
    render(<CustomParent />);
    jest.useFakeTimers();
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    jest.runAllTimers();

    let itemHolder;
    try {
      itemHolder = screen.getByTestId("menuItemHolder");
    } catch (err) {}
    expect(itemHolder).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    expect(itemHolder).not.toBeInTheDocument();
  });
});
