import MainLayout from "./mainLayout";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const Com = ({ testid }: any) => <div data-testid={testid}></div>;

const CustomParent = () => {
  return (
    <MainLayout
      leftNavbar={<Com testid="leftnav" />}
      main={<Com testid="main" />}
      side={<Com testid="side" />}
      topNavbar={<Com testid="topnav" />}
    />
  );
};

describe("TEST COMPONENT : MainLayout", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("leftnav")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("side")).toBeInTheDocument();
    expect(screen.getByTestId("topnav")).toBeInTheDocument();
  });
});
