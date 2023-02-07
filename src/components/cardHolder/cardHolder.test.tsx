import CardHolder from "./cardHolder";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

jest.mock("next/router", () => require("next-router-mock"));

const cards: FileData[] = [
  { name: "file1", date: "123", isDirectory: false, size: 0 },
  { name: "dir1", date: "123", isDirectory: false, size: 0 },
  { name: "file2", date: "123", isDirectory: true, size: 0 },
  { name: "file3", date: "123", isDirectory: false, size: 0 },
];

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <CardHolder cards={cards} />
    </Provider>
  );
};

describe("TEST COMPONENT : CardHolder", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("cardHolder")).toBeInTheDocument();
    cards.forEach((card) => {
      expect(screen.getByTestId(`cardHolder_${card.name}`));
    });
  });
});
