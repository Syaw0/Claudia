import LogoutSetting from "./logoutSetting";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";
import logout from "./../../utils/logout";
import router from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("./../../utils/logout.ts");

const mockLogout = logout as jest.Mock;

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <LogoutSetting />
    </Provider>
  );
};
jest.useFakeTimers();
describe("TEST COMPONENT : LogoutSetting", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("logoutSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("logoutSettingButton")).toBeInTheDocument();
  });
  it("lets play with that", async () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    const button = screen.getByTestId("logoutSettingButton");
    mockLogout.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(button);
    jest.runAllTimers();
    await waitFor(() => expect(router.asPath).toEqual("/auth"));
  });
});
