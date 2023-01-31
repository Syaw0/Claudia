import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./login";
import checkLoginForm from "../../utils/checkLoginForm";
import makeStore from "../../store/authentication/authenticationStore";
import { Provider } from "react-redux";

jest.mock("../../utils/checkLoginForm");

const mockCheckLoginForm = checkLoginForm as jest.Mock;

describe("TEST COMPONENT: Login Form", () => {
  beforeEach(() => {
    render(
      <Provider store={makeStore()}>
        <LoginForm />
      </Provider>
    );
  });
  it("its must render perfectly", () => {
    expect(screen.getByTestId("loginForm")).toBeInTheDocument();

    expect(screen.getByTestId("loginForm")).toBeInTheDocument();
    expect(screen.getByTestId("loginForm_emailInput")).toBeInTheDocument();
    expect(screen.getByTestId("loginForm_passwordInput")).toBeInTheDocument();
    expect(
      screen.getByTestId("loginForm_forgetPasswordButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("loginForm_createAccountButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("loginForm_nextButton")).toBeInTheDocument();
  });

  it("change inputs", () => {
    const emailInput = screen.getByTestId("loginForm_emailInput");
    const passwordInput = screen.getByTestId("loginForm_passwordInput");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    fireEvent.change(emailInput, { target: { value: "something" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    expect(emailInput).toHaveValue("something");
    expect(passwordInput).toHaveValue("something2");
  });

  it("click on the next check email and password types and emptiness", () => {
    const emailInput = screen.getByTestId("loginForm_emailInput");
    const passwordInput = screen.getByTestId("loginForm_passwordInput");
    const nextButton = screen.getByTestId("loginForm_nextButton");

    //check inputs emptiness
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check email form
    fireEvent.change(emailInput, { target: { value: "something" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    // check password length
    fireEvent.change(emailInput, { target: { value: "something@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "s2" } });
    fireEvent.click(nextButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  it("if inputs are ok click on the next trigger a fetch to server to check data", async () => {
    mockCheckLoginForm.mockReturnValue(
      new Promise((res) => res({ status: false }))
    );
    const emailInput = screen.getByTestId("loginForm_emailInput");
    const passwordInput = screen.getByTestId("loginForm_passwordInput");
    const nextButton = screen.getByTestId("loginForm_nextButton");

    fireEvent.change(emailInput, { target: { value: "something@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "something2" } });
    fireEvent.click(nextButton);
    expect(mockCheckLoginForm).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockCheckLoginForm.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );

    fireEvent.click(nextButton);
    expect(mockCheckLoginForm).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
