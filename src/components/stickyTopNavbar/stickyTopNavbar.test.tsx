import StickyTopNavbar from "./stickyTopNavbar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <StickyTopNavbar />
    </Provider>
  );
};

describe("TEST COMPONENT : StickyTopNavbar", () => {
  it("it render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("stickyTopNavbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("stickyTopNavbarButton")).toBeInTheDocument();
    expect(screen.getByTestId("stickyTopNavbarProfile")).toBeInTheDocument();
  });
});
