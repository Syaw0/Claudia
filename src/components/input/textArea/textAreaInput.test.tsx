import TextArea from "./textAreaInput";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChangeEvent, useState } from "react";
import IconSearch from "../../../assets/icons/iconSearch";

const CustomParent = () => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInp(value);
  };

  const [inp, setInp] = useState("");
  return (
    <TextArea
      id="myInput"
      label="myLabel"
      onChange={changeHandler}
      value={inp}
      placeholder="some placeholder"
      testId="inputId"
    />
  );
};

describe("Component Test : Input Text", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByText("myLabel")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("some placeholder")).toBeInTheDocument();
    expect(screen.getByTestId("inputId")).toBeInTheDocument();
  });

  it("change input and given string must be in it", () => {
    render(<CustomParent />);
    const input: HTMLInputElement = screen.getByTestId("inputId");
    fireEvent.change(input, {
      target: { value: "ss" },
    });
    expect(input.value).toEqual("ss");
    fireEvent.change(input, {
      target: { value: "" },
    });
    expect(input.value).toEqual("");
  });

  it("lets render text input with icon", () => {
    render(<CustomParent />);
  });
});
