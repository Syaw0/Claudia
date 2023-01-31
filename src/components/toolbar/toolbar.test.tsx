import ToolBar from "./toolbar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import toolbarItems from "../../shared/toolbarItems";

const CustomComponent = () => {
  return <ToolBar items={toolbarItems} />;
};

describe("TEST COMPONENT : ToolbarItem", () => {
  it("its render properly", () => {
    render(<CustomComponent />);
    expect(screen.getByTestId("toolbarHolder")).toBeInTheDocument();
    toolbarItems.forEach((item) => {
      expect(
        screen.getByTestId(`toolbarItem_${item.name}`)
      ).toBeInTheDocument();
    });
  });
});
