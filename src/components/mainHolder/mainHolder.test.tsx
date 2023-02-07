import MainHolder from "./mainHolder";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const Com = ({ testid }: any) => {
  return <div data-testid={testid} />;
};

const CustomParent = () => {
  return (
    <MainHolder
      content={<Com testid="content" />}
      head="somehead"
      rightHead={<Com testid="righthead" />}
      subhead={<Com testid="subhead" />}
    />
  );
};

describe("TEST COMPONENT : MainHolder", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("mainHolder")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("righthead")).toBeInTheDocument();
    expect(screen.getByTestId("subhead")).toBeInTheDocument();
    expect(screen.getByTestId("mainHolder")).toHaveTextContent("somehead");
  });
});
