import OtpInput from "./otp";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

const CustomParent = ({ len = 6 }: any) => {
  const [val, setVal] = useState("");

  return <OtpInput value={val} setValue={setVal} len={len} />;
};

describe("TEST COMPONENT : Otp Input", () => {
  it("its must render perfectly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("otpHolder")).toBeInTheDocument();

    expect(screen.getByTestId("otpInput_0")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_1")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_2")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_3")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_4")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_5")).toBeInTheDocument();
  });

  it("wa can also render custom len of otp", () => {
    render(<CustomParent len={8} />);
    expect(screen.getByTestId("otpInput_0")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_1")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_2")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_3")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_4")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_5")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_6")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_7")).toBeInTheDocument();
  });

  it("change inputs", () => {
    render(<CustomParent len={4} />);
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    fireEvent.click(inp1);
    expect(document.activeElement == inp1).toBeTruthy();
    fireEvent.change(inp1, { target: { value: 1 } });
    expect(document.activeElement == inp1).toBeFalsy();
    expect(document.activeElement == inp2).toBeTruthy();
    //even if click on the last input focused on the last who has value
    fireEvent.click(inp4);
    expect(document.activeElement == inp2).toBeTruthy();
    fireEvent.change(inp2, { target: { value: 1 } });
    expect(document.activeElement == inp3).toBeTruthy();
    fireEvent.change(inp3, { target: { value: 1 } });
    expect(document.activeElement == inp4).toBeTruthy();

    fireEvent.change(inp4, { target: { value: 1 } });
    expect(document.activeElement == inp4).toBeTruthy();

    fireEvent.keyDown(inp4, { key: "Backspace" });
    expect(document.activeElement == inp4).toBeFalsy();
    expect(document.activeElement == inp3).toBeTruthy();
  });

  it("just numbers!", () => {
    render(<CustomParent len={4} />);
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    fireEvent.click(inp1);
    expect(document.activeElement == inp1).toBeTruthy();
    fireEvent.change(inp1, { target: { value: "s" } });
    expect(document.activeElement == inp1).toBeTruthy();
    expect(document.activeElement == inp2).toBeFalsy();
  });
});
