import SettingHolder from "./settingHolder";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <SettingHolder />
    </Provider>
  );
};

describe("TEST COMPONENT : SettingHolder", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("settingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("profileSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("nameSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("passwordSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("logoutSettingHolder")).toBeInTheDocument();
  });
});
