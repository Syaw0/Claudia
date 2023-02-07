import Typography from "./typography";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const CustomParent = () => {
  return <Typography testid="someTypography">Hello bitch</Typography>;
};

describe("Component Test : Typography", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check if given data is correct", () => {
    expect(screen.getByTestId("someTypography")).toBeInTheDocument();
  });
});
