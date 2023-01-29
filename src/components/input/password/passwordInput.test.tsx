import PasswordInput from "./passwordInput";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChangeEvent, useState } from "react";

const CustomParent = () => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInp(value);
  };

  const [inp, setInp] = useState("");
  return (
    <PasswordInput
      id="myInput"
      label="myLabel"
      onChange={changeHandler}
      value={inp}
      placeholder="some placeholder"
      testId="passwordInput"
    />
  );
};

describe("Component Test : Input Password", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check if given data is correct", () => {
    expect(screen.getByText("myLabel")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("some placeholder")).toBeInTheDocument();
    expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
  });

  it("change input and given string must be in it", () => {
    const input: HTMLInputElement = screen.getByTestId("passwordInput");
    fireEvent.change(input, {
      target: { value: "ss" },
    });
    expect(input.value).toEqual("ss");
    fireEvent.change(input, {
      target: { value: "" },
    });
    expect(input.value).toEqual("");
  });
});
