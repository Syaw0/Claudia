import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetPassword from "./resetPassword";
import resetPassword from "../../utils/resetPassword";
import makeStore from "../../store/authentication/authenticationStore";
import { Provider } from "react-redux";

jest.mock("../../utils/resetPassword");

const mockResetPassword = resetPassword as jest.Mock;

describe("TEST COMPONENT: ResetPassword Form", () => {
  beforeEach(() => {
    render(
      <Provider store={makeStore({})}>
        <ResetPassword />
      </Provider>
    );
  });
  it("its must render perfectly", () => {
    expect(screen.getByTestId("resetPasswordForm")).toBeInTheDocument();

    expect(
      screen.getByTestId("resetPasswordForm_passwordInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordForm_RetypePasswordInput")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("resetPasswordForm_loginButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordForm_nextButton")
    ).toBeInTheDocument();
  });

  it("change inputs", () => {
    const passwordInput = screen.getByTestId("resetPasswordForm_passwordInput");
    const retypePasswordInput = screen.getByTestId(
      "resetPasswordForm_RetypePasswordInput"
    );
    expect(retypePasswordInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    fireEvent.change(retypePasswordInput, { target: { value: "something" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    expect(retypePasswordInput).toHaveValue("something");
    expect(passwordInput).toHaveValue("something2");
  });

  it("click on the next check email and password types and emptiness", () => {
    const passwordInput = screen.getByTestId("resetPasswordForm_passwordInput");
    const retypePasswordInput = screen.getByTestId(
      "resetPasswordForm_RetypePasswordInput"
    );
    const nextButton = screen.getByTestId("resetPasswordForm_nextButton");

    //check inputs emptiness
    expect(retypePasswordInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check email form
    fireEvent.change(retypePasswordInput, { target: { value: "something" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check password length
    fireEvent.change(retypePasswordInput, { target: { value: "s2" } });
    fireEvent.change(passwordInput, { target: { value: "s2" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check equality
    fireEvent.change(retypePasswordInput, { target: { value: "123123" } });
    fireEvent.change(passwordInput, { target: { value: "321321" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  it("if inputs are ok click on the next trigger a fetch to server to check data", async () => {
    mockResetPassword.mockReturnValue(
      new Promise((res) => res({ status: false }))
    );
    const passwordInput = screen.getByTestId("resetPasswordForm_passwordInput");
    const retypePasswordInput = screen.getByTestId(
      "resetPasswordForm_RetypePasswordInput"
    );
    const nextButton = screen.getByTestId("resetPasswordForm_nextButton");

    fireEvent.change(passwordInput, {
      target: { value: "123123" },
    });
    fireEvent.change(retypePasswordInput, { target: { value: "123123" } });
    fireEvent.click(nextButton);
    expect(mockResetPassword).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockResetPassword.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );

    fireEvent.click(nextButton);
    expect(mockResetPassword).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
