import UsageMeter from "./usageMeter";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <UsageMeter />
    </Provider>
  );
};

describe("TEST COMPONENT : UsageMeter", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    const progressBar = screen.getByTestId("usageMeterProgressBar");
    const progressHolder = screen.getByTestId("usageMeterProgressHolder");
    expect(screen.getByTestId("usageMeterHolder")).toBeInTheDocument();
    expect(screen.getByTestId("usageMeterHeadText")).toBeInTheDocument();
    expect(progressHolder).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
    expect(screen.getByTestId("usageMeterBottomText")).toBeInTheDocument();
  });
});
