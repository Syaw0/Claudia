import ToolBar from "./toolbar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import toolbarItems from "../../shared/toolbarItems";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

const CustomComponent = ({ type = "file" }: any) => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <ToolBar type={type} items={toolbarItems} />
    </Provider>
  );
};

describe("TEST COMPONENT : ToolbarItem", () => {
  it("its render properly", () => {
    render(<CustomComponent />);
    expect(screen.getByTestId("toolbarHolder")).toBeInTheDocument();
    toolbarItems.forEach((item) => {
      if (item.type == "file") {
        expect(
          screen.getByTestId(`toolbarItem_${item.name}`)
        ).toBeInTheDocument();
      } else if (item.name != "info") {
        let toolbar;
        try {
          toolbar = screen.getByTestId(`toolbarItem_${item.name}`);
        } catch {}
        expect(toolbar).toBeUndefined();
      }
    });
  });

  it("if type is directory just show toolbar items that have this type", () => {
    render(<CustomComponent type="dir" />);
    expect(screen.getByTestId("toolbarHolder")).toBeInTheDocument();
    toolbarItems.forEach((item) => {
      if (item.type == "dir" && item.name != "info") {
        expect(
          screen.getByTestId(`toolbarItem_${item.name}`)
        ).toBeInTheDocument();
      } else if (item.name != "info") {
        let toolbar;
        try {
          toolbar = screen.getByTestId(`toolbarItem_${item.name}`);
        } catch {}
        expect(toolbar).toBeUndefined();
      }
    });
  });
});
