import TextInput from "./textInput";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChangeEvent, useState } from "react";
import IconSearch from "../../../assets/icons/iconSearch";

const CustomParent = ({ withIcon = false }: { withIcon: boolean }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInp(value);
  };

  const [inp, setInp] = useState("");
  return (
    <TextInput
      id="myInput"
      label="myLabel"
      onChange={changeHandler}
      value={inp}
      placeholder="some placeholder"
      type={withIcon ? "search" : "email"}
      testId="inputId"
      {...(withIcon
        ? {
            EndIcon: (
              <IconSearch width="20" height="20" data-testid="searchIcon" />
            ),
          }
        : {})}
    />
  );
};

describe("Component Test : Input Text", () => {
  it("check if given data is correct", () => {
    render(<CustomParent withIcon={false} />);
    expect(screen.getByText("myLabel")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("some placeholder")).toBeInTheDocument();
    expect(screen.getByTestId("inputId")).toBeInTheDocument();
  });

  it("change input and given string must be in it", () => {
    render(<CustomParent withIcon={false} />);
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
    render(<CustomParent withIcon={true} />);

    expect(screen.getByTestId("searchIcon")).toBeInTheDocument();
  });
});
