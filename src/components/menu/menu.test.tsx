import Menu from "./menu";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mock1 = jest.fn(() => {});
const mock2 = jest.fn(() => {});

const options = [
  { text: "option1", onClick: mock1 },
  { text: "option2", onClick: mock2 },
];

const CustomParent = () => {
  return <Menu items={options} />;
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
    itemHolder = screen.getByTestId("menuItemHolder");
    expect(itemHolder).toBeInTheDocument();
    expect(screen.getByTestId(options[0].text)).toBeInTheDocument();
    expect(screen.getByTestId(options[1].text)).toBeInTheDocument();
  });
  it("if click on items onClick run", () => {
    render(<CustomParent />);

    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    fireEvent.click(screen.getByTestId(options[0].text));
    expect(mock1).toBeCalledTimes(1);
    //* click on the items will close the menu
    let itemHolder;
    try {
      itemHolder = screen.getByTestId("menuItemHolder");
    } catch (err) {}
    expect(itemHolder).toBeUndefined();
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    fireEvent.click(screen.getByTestId(options[1].text));
    expect(mock2).toBeCalledTimes(1);
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

    fireEvent.click(screen.getByTestId("menuHolderIcon"));

    let itemHolder;
    try {
      itemHolder = screen.getByTestId("menuItemHolder");
    } catch (err) {}
    expect(itemHolder).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    expect(itemHolder).not.toBeInTheDocument();
  });
});
