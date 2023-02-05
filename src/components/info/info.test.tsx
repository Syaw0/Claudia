import makeStore from "../../store/mycloud/mycloudStore";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Info from "./info";

const preState = {
  selectedFileData: {
    name: "this is it",
    date: "0",
    size: 0,
    isDirectory: false,
  },
};

const CustomParent = () => {
  return (
    <Provider store={makeStore(preState)}>
      <Info />
    </Provider>
  );
};

describe("TEST COMPONENT : Remove ", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    const holder = screen.getByTestId("infoHolder");
    expect(holder).toBeInTheDocument();
    expect(screen.getByTestId("infoQuitButton")).toBeInTheDocument();
    expect(holder).toHaveTextContent(preState.selectedFileData.date);
    expect(holder).toHaveTextContent(preState.selectedFileData.name);
    expect(holder).toHaveTextContent(`${preState.selectedFileData.size}`);
  });
});
