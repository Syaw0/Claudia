import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "./signup";
import signup from "../../utils/signup";

jest.mock("../../utils/signup");

const mockSignup = signup as jest.Mock;

describe("TEST COMPONENT: Signup Form", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  it("its must render perfectly", () => {
    expect(screen.getByTestId("signupForm")).toBeInTheDocument();

    expect(screen.getByTestId("signupForm_nameInput")).toBeInTheDocument();
    expect(screen.getByTestId("signupForm_emailInput")).toBeInTheDocument();
    expect(screen.getByTestId("signupForm_passwordInput")).toBeInTheDocument();

    expect(
      screen.getByTestId("signupForm_loginInsteadButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("signupForm_nextButton")).toBeInTheDocument();
  });

  it("change inputs", () => {
    const nameInput = screen.getByTestId("signupForm_nameInput");
    const emailInput = screen.getByTestId("signupForm_emailInput");
    const passwordInput = screen.getByTestId("signupForm_passwordInput");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(nameInput).toHaveValue("");
    fireEvent.change(emailInput, { target: { value: "something" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    fireEvent.change(nameInput, { target: { value: "something3" } });
    expect(emailInput).toHaveValue("something");
    expect(passwordInput).toHaveValue("something2");
    expect(nameInput).toHaveValue("something3");
  });

  it("click on the next check email and password types and emptiness", () => {
    const nameInput = screen.getByTestId("signupForm_nameInput");
    const emailInput = screen.getByTestId("signupForm_emailInput");
    const passwordInput = screen.getByTestId("signupForm_passwordInput");
    const nextButton = screen.getByTestId("signupForm_nextButton");

    //check inputs emptiness
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(nameInput).toHaveValue("");
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check email form
    fireEvent.change(emailInput, { target: { value: "something" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    fireEvent.change(nameInput, { target: { value: "something3" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check password length
    fireEvent.change(emailInput, { target: { value: "something@gmail.com" } });
    fireEvent.change(nameInput, { target: { value: "something3" } });
    fireEvent.change(passwordInput, { target: { value: "s2" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  it("if inputs are ok click on the next trigger a fetch to server to check data", async () => {
    mockSignup.mockReturnValue(new Promise((res) => res({ status: false })));
    const nameInput = screen.getByTestId("signupForm_nameInput");
    const emailInput = screen.getByTestId("signupForm_emailInput");
    const passwordInput = screen.getByTestId("signupForm_passwordInput");
    const nextButton = screen.getByTestId("signupForm_nextButton");

    fireEvent.change(emailInput, { target: { value: "something@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    fireEvent.change(nameInput, { target: { value: "something3" } });
    fireEvent.click(nextButton);
    expect(mockSignup).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockSignup.mockReturnValue(new Promise((res) => res({ status: true })));

    fireEvent.click(nextButton);
    expect(mockSignup).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
