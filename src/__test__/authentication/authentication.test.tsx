import AuthenticationPage from "../../pages/auth";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/authentication/authenticationStore";
import checkLoginForm from "../../utils/checkLoginForm";
import signup from "../../utils/signup";
import getAnotherAuthenticationToken from "../../utils/getAnotherAuthenticationToken";
import checkOtpToken from "../../utils/checkOtpToken";
import resetPassword from "../../utils/resetPassword";
import forgetPassword from "../../utils/forgetPassword";
import router from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("../../utils/forgetPassword");
jest.mock("../../utils/resetPassword");
jest.mock("../../utils/getAnotherAuthenticationToken");
jest.mock("../../utils/checkOtpToken");
jest.mock("../../utils/checkLoginForm");
jest.mock("../../utils/signup");

// TODO why don`t i mock useRouter ?
// TODO i just lazy to test resetPassword login button action :)

const mockForgetPassword = forgetPassword as jest.Mock;
const mockResetPassword = resetPassword as jest.Mock;
const mockGetAnotherAuthToken = getAnotherAuthenticationToken as jest.Mock;
const mockCheckOtpToken = checkOtpToken as jest.Mock;
const mockSignup = signup as jest.Mock;
const mockCheckLoginForm = checkLoginForm as jest.Mock;

const CustomParent = () => {
  return (
    <Provider store={makeStore()}>
      <AuthenticationPage />
    </Provider>
  );
};

describe("TEST PAGE : Authentication page", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("lets see if it render properly", () => {
    expect(screen.getByTestId("authenticationPageLogo")).toBeInTheDocument();
    //  for first render loginForm rendered in the dom
    expect(screen.getByTestId("loginForm")).toBeInTheDocument();
  });

  it("lets navigate between components", () => {
    fireEvent.click(screen.getByTestId("loginForm_createAccountButton"));
    expect(screen.getByTestId("signupForm")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("signupForm_loginInsteadButton"));
    expect(screen.getByTestId("loginForm")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("loginForm_forgetPasswordButton"));
    expect(screen.getByTestId("forgetPasswordForm")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("forgetPasswordForm_loginButton"));
    expect(screen.getByTestId("loginForm")).toBeInTheDocument();
  });

  it("login flow", async () => {
    mockCheckLoginForm.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.change(screen.getByTestId("loginForm_emailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("loginForm_passwordInput"), {
      target: { value: "123123123" },
    });
    fireEvent.click(screen.getByTestId("loginForm_nextButton"));
    expect(mockCheckLoginForm).toHaveBeenCalledTimes(1);
    let tfa;
    try {
      tfa = screen.getByTestId("tfaForm");
    } catch (err) {}
    expect(tfa).toBeUndefined();
    mockCheckLoginForm.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("loginForm_nextButton"));
    await waitFor(() =>
      expect(screen.getByTestId("tfaForm")).toBeInTheDocument()
    );

    // now we are in two factor authentication component

    mockCheckOtpToken.mockReturnValue(
      new Promise((res) => res({ status: false }))
    );
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 2 } });
    fireEvent.change(inp3, { target: { value: 3 } });
    fireEvent.change(inp4, { target: { value: 4 } });
    fireEvent.change(inp5, { target: { value: 5 } });
    fireEvent.change(inp6, { target: { value: 6 } });

    fireEvent.click(screen.getByTestId("tfaForm_nextButton"));
    await waitFor(() => expect(router.asPath).not.toEqual("/mycloud"));

    mockCheckOtpToken.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("tfaForm_nextButton"));
    await waitFor(() => expect(router.asPath).toEqual("/mycloud"));

    fireEvent.click(screen.getByTestId("tfaForm_LoginButton"));
    expect(screen.getByTestId("loginForm")).toBeInTheDocument();
  });

  it("signup flow", async () => {
    await waitFor(() => router.replace("/auth"));
    fireEvent.click(screen.getByTestId("loginForm_createAccountButton"));
    mockSignup.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.change(screen.getByTestId("signupForm_nameInput"), {
      target: { value: "siaw" },
    });
    fireEvent.change(screen.getByTestId("signupForm_emailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("signupForm_passwordInput"), {
      target: { value: "123123123" },
    });
    fireEvent.click(screen.getByTestId("signupForm_nextButton"));
    expect(mockSignup).toHaveBeenCalledTimes(1);

    let tfa;
    try {
      tfa = screen.getByTestId("tfaForm");
    } catch (err) {}

    expect(tfa).toBeUndefined();

    mockSignup.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("signupForm_nextButton"));
    await waitFor(() =>
      expect(screen.getByTestId("tfaForm")).toBeInTheDocument()
    );

    // now we are in two factor authentication component

    mockCheckOtpToken.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 2 } });
    fireEvent.change(inp3, { target: { value: 3 } });
    fireEvent.change(inp4, { target: { value: 4 } });
    fireEvent.change(inp5, { target: { value: 5 } });
    fireEvent.change(inp6, { target: { value: 6 } });

    fireEvent.click(screen.getByTestId("tfaForm_nextButton"));
    await waitFor(() => expect(router.asPath).toEqual("/mycloud"));

    fireEvent.click(screen.getByTestId("tfaForm_LoginButton"));
    await waitFor(() =>
      expect(screen.getByTestId("loginForm")).toBeInTheDocument()
    );
  });

  it("forget Password flow", async () => {
    await waitFor(() => router.replace("/auth"));
    mockForgetPassword.mockResolvedValue(
      new Promise((res) => res({ status: false }))
    );
    fireEvent.click(screen.getByTestId("loginForm_forgetPasswordButton"));
    expect(screen.getByTestId("forgetPasswordForm")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("forgetPasswordForm_emailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.click(screen.getByTestId("forgetPasswordForm_nextButton"));
    expect(mockForgetPassword).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("forgetPasswordForm")).toBeInTheDocument();
    mockForgetPassword.mockResolvedValue(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("forgetPasswordForm_nextButton"));

    await waitFor(() =>
      expect(screen.getByTestId("tfaForm")).toBeInTheDocument()
    );
    mockCheckOtpToken.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 2 } });
    fireEvent.change(inp3, { target: { value: 3 } });
    fireEvent.change(inp4, { target: { value: 4 } });
    fireEvent.change(inp5, { target: { value: 5 } });
    fireEvent.change(inp6, { target: { value: 6 } });

    fireEvent.click(screen.getByTestId("tfaForm_nextButton"));

    // now we are going to resetPassword component

    mockResetPassword.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );

    await waitFor(() =>
      expect(screen.getByTestId("resetPasswordForm")).toBeInTheDocument()
    );
    fireEvent.change(screen.getByTestId("resetPasswordForm_passwordInput"), {
      target: { value: "123123123" },
    });
    fireEvent.change(
      screen.getByTestId("resetPasswordForm_RetypePasswordInput"),
      { target: { value: "123123123" } }
    );
    fireEvent.click(screen.getByTestId("resetPasswordForm_nextButton"));
    expect(mockResetPassword).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    let loginForm;
    try {
      loginForm = screen.getByTestId("loginForm");
    } catch (err) {}
    expect(loginForm).toBeUndefined();

    mockResetPassword.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("resetPasswordForm_nextButton"));
    await waitFor(() =>
      expect(screen.getByTestId("loginForm")).toBeInTheDocument()
    );
  });
});
