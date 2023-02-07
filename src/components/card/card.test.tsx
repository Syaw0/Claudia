import Card from "./card";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import router from "next-router-mock";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

jest.mock("next/router", () => require("next-router-mock"));

const cardInfo: FileData = {
  name: "Directory",
  date: "2002-02-02",
  isDirectory: true,
  size: 0,
};
const cardInfo2: FileData = {
  name: "file",
  date: "2002-02-02",
  isDirectory: false,
  size: 0,
};

const CustomParent = ({ ...params }: any) => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <Card {...params} />
    </Provider>
  );
};

describe("TEST COMPONENT : Card ", () => {
  it("its render properly", () => {
    render(<CustomParent {...cardInfo} />, { wrapper: MemoryRouterProvider });
    expect(
      screen.getByTestId(`cardHolder_${cardInfo.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`cardHolder_${cardInfo.name}_top`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`cardHolder_${cardInfo.name}_bottom`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`cardHolder_${cardInfo.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`cardHolder_${cardInfo.name}_bottom`)
    ).toHaveTextContent(cardInfo.date);
    expect(
      screen.getByTestId(`cardHolder_${cardInfo.name}_bottom`)
    ).toHaveTextContent(cardInfo.name);
    expect(screen.getByTestId(`menuHolder`)).toBeInTheDocument();

    fireEvent.doubleClick(screen.getByTestId(`cardHolder_${cardInfo.name}`));
    // ! but this happen just if type is equal to dir!
    expect(router.asPath).toEqual(`//${cardInfo.name}`);
  });
  it("if card render as file", () => {
    render(<CustomParent {...cardInfo2} />, { wrapper: MemoryRouterProvider });
    fireEvent.doubleClick(screen.getByTestId(`cardHolder_${cardInfo2.name}`));
    expect(router.asPath).not.toEqual(`//${cardInfo2.name}`);
  });
});
