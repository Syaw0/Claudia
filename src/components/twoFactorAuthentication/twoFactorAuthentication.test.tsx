import "@testing-library/jest-dom";
import TwoFactorAuthentication from "./twoFactorAuthentication";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import getAnotherAuthenticationToken from "../../utils/getAnotherAuthenticationToken";
import checkOtpToken from "../../utils/checkOtpToken";

jest.mock("../../utils/getAnotherAuthenticationToken");
jest.mock("../../utils/checkOtpToken");

const mockGetAnotherAuthToken = getAnotherAuthenticationToken as jest.Mock;
const mockCheckOtpToken = checkOtpToken as jest.Mock;

describe("TEST COMPONENT : TwoFactorAuthentication", () => {
  it("its render perfectly", () => {
    render(<TwoFactorAuthentication />);

    expect(screen.getByTestId("otpInput_0")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_1")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_2")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_3")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_4")).toBeInTheDocument();
    expect(screen.getByTestId("otpInput_5")).toBeInTheDocument();

    expect(screen.getByTestId("tfaForm")).toBeInTheDocument();
    expect(screen.getByTestId("tfaForm_getFreshCode")).toBeInTheDocument();

    expect(screen.getByTestId("tfaForm_LoginButton")).toBeInTheDocument();
    expect(screen.getByTestId("tfaForm_nextButton")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    jest.useFakeTimers();
  });

  it("if reset timer reach to 0 we can click on the getFresh to get new code", async () => {
    render(<TwoFactorAuthentication resetTime={0} />);
    mockGetAnotherAuthToken.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    jest.useFakeTimers();
    fireEvent.click(screen.getByTestId("tfaForm_getFreshCode"));
    expect(mockGetAnotherAuthToken).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByTestId("waitMessage")));
    await waitFor(() => expect(screen.getByTestId("successMessage")));
    mockGetAnotherAuthToken.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("tfaForm_getFreshCode"));
    await waitFor(() => expect(screen.getByTestId("waitMessage")));
    await waitFor(() => expect(screen.getByTestId("errorMessage")));
  });

  it("next button functionality", async () => {
    render(<TwoFactorAuthentication resetTime={0} />);
    const nextButton = screen.getByTestId("tfaForm_nextButton");
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    mockCheckOtpToken.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    render(<TwoFactorAuthentication resetTime={0} />);
    jest.useFakeTimers();

    // because inputs are empty
    fireEvent.click(nextButton);
    await waitFor(() => expect(screen.getByTestId("errorMessage")));

    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 1 } });
    fireEvent.change(inp3, { target: { value: 1 } });
    fireEvent.change(inp4, { target: { value: 1 } });
    fireEvent.change(inp5, { target: { value: 1 } });
    fireEvent.change(inp6, { target: { value: 1 } });

    fireEvent.click(nextButton);
    await waitFor(() => expect(screen.getByTestId("waitMessage")));
    await waitFor(() => expect(screen.getByTestId("successMessage")));

    mockCheckOtpToken.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.click(nextButton);
    await waitFor(() => expect(screen.getByTestId("waitMessage")));
    await waitFor(() => expect(screen.getByTestId("errorMessage")));
  });
});
