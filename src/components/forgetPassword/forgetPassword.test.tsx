import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import forgetPassword from "../../utils/forgetPassword";
import ForgetPassword from "./forgetPassword";

jest.mock("../../utils/forgetPassword");

const mockForgetPassword = forgetPassword as jest.Mock;

describe("TEST COMPONENT: ForgetPassword Form", () => {
  beforeEach(() => {
    render(<ForgetPassword />);
  });
  it("its must render perfectly", () => {
    expect(screen.getByTestId("forgetPasswordForm")).toBeInTheDocument();

    expect(
      screen.getByTestId("forgetPasswordForm_emailInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("forgetPasswordForm_createAccountButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("forgetPasswordForm_nextButton")
    ).toBeInTheDocument();
  });

  it("change inputs", () => {
    const emailInput = screen.getByTestId("forgetPasswordForm_emailInput");
    expect(emailInput).toHaveValue("");
    fireEvent.change(emailInput, { target: { value: "something" } });
    expect(emailInput).toHaveValue("something");
  });

  it("click on the next check email and password types and emptiness", () => {
    const emailInput = screen.getByTestId("forgetPasswordForm_emailInput");
    const nextButton = screen.getByTestId("forgetPasswordForm_nextButton");

    //check inputs emptiness
    expect(emailInput).toHaveValue("");
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check email form
    fireEvent.change(emailInput, { target: { value: "something" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  it("if inputs are ok click on the next trigger a fetch to server to check data", async () => {
    mockForgetPassword.mockReturnValue(
      new Promise((res) => res({ status: false }))
    );
    const emailInput = screen.getByTestId("forgetPasswordForm_emailInput");
    const nextButton = screen.getByTestId("forgetPasswordForm_nextButton");

    fireEvent.change(emailInput, { target: { value: "something@gmail.com" } });
    fireEvent.click(nextButton);
    expect(mockForgetPassword).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockForgetPassword.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );

    fireEvent.click(nextButton);
    expect(mockForgetPassword).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
