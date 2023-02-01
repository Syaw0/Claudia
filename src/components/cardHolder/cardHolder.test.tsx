import CardHolder from "./cardHolder";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

const cards = [
  { name: "file1", date: "123", type: "file" },
  { name: "dir1", date: "123", type: "dir" },
  { name: "file2", date: "123", type: "file" },
  { name: "file3", date: "123", type: "file" },
];

const CustomParent = () => {
  return (
    <CardHolder
      cards={[
        { name: "file1", date: "123", type: "file" },
        { name: "dir1", date: "123", type: "dir" },
        { name: "file2", date: "123", type: "file" },
        { name: "file3", date: "123", type: "file" },
      ]}
    />
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
