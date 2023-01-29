import Button from "./button";
import IconEyeClose from "../../assets/icons/iconEyeClose";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";

const mockFun = jest.fn(() => {});

const CustomParent = () => {
  const [loader, setLoader] = useState(false);
  return (
    <Button
      id="button"
      onClick={() => {
        mockFun();
        setLoader((s) => !s);
      }}
      testid="buttonId"
      StartIcon={IconEyeClose}
      EndIcon={IconEyeClose}
      loader={loader}
      disabled={loader}
    >
      button
    </Button>
  );
};

describe("Component Test : Button", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check component render perfectly", () => {
    expect(screen.getByTestId("buttonId")).toBeInTheDocument();
    expect(screen.getByTestId("buttonId-startIcon")).toBeInTheDocument();
    expect(screen.getByTestId("buttonId-endIcon")).toBeInTheDocument();
  });

  it("if click on the button onClick called", () => {
    const button = screen.getByTestId("buttonId");
    fireEvent.click(button);
    expect(mockFun).toBeCalledTimes(1);
  });

  it("we can pass disabled and loader props and control loader and disability", () => {
    const button: any = screen.getByTestId("buttonId");
    fireEvent.click(button);
    const loader = screen.getByTestId("circleLoader");
    expect(loader).toBeInTheDocument();
    expect(button.disabled).toEqual(true);
  });
});
