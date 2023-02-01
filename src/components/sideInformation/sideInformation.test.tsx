import SideInformation from "./sideInformation";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";

const fakeSideData = {
  name: "pic.png",
  date: "2022-01-02",
  size: 200,
  type: "file",
};

const CustomParent = () => {
  return (
    <Provider
      store={makeStore({
        sideData: {
          name: "pic.png",
          date: "2022-01-02",
          size: 200,
          type: "file",
        },
      })}
    >
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
    expect(detail).toHaveTextContent(`${fakeSideData.size}`);
    expect(mainInfo).toHaveTextContent(`${fakeSideData.name}`);
  });
});
