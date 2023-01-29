import Layout from "./layout";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return (
    <Layout
      leftSide={<div data-testid="div-left"></div>}
      rightSide={<div data-testid="div-right"></div>}
    />
  );
};

describe("Component Test : Layout", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("layoutLeft")).toBeInTheDocument();
    expect(screen.getByTestId("layoutRight")).toBeInTheDocument();
    expect(screen.getByTestId("div-left")).toBeInTheDocument();
    expect(screen.getByTestId("div-right")).toBeInTheDocument();
  });
});
