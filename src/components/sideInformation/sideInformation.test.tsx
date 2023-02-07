import SideInformation from "./sideInformation";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import byteToMgb from "../../utils/byteToMgb";

const fakeSideData = {
  name: "pic.png",
  date: "2022-01-02",
  size: 1000000,
  isDirectory: false,
};

const CustomParent = () => {
  return (
    <Provider store={makeStore({ sideData: fakeSideData })}>
      <SideInformation />
    </Provider>
  );
};

describe("TEST COMPONENT : SideInformation", () => {
  it("it render properly", () => {
    render(<CustomParent />);
    const detail = screen.getByTestId("sideInformationDetail");
    const mainInfo = screen.getByTestId("sideInformationMainInfo");
    expect(screen.getByTestId("sideInformationHolder")).toBeInTheDocument();
    expect(screen.getByTestId("sideInformationIcon")).toBeInTheDocument();
    expect(screen.getByTestId("sideInformationToolbar")).toBeInTheDocument();
    expect(mainInfo).toBeInTheDocument();
    expect(detail).toBeInTheDocument();
    expect(detail).toHaveTextContent(fakeSideData.date);
    expect(detail).toHaveTextContent(`${byteToMgb(fakeSideData.size)}`);
    expect(mainInfo).toHaveTextContent(`${fakeSideData.name}`);
  });
});
