import ProfileSetting from "./profileSetting";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <ProfileSetting />
    </Provider>
  );
};

describe("TEST COMPONENT : ProfileSetting", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("profileSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("profileSettingProfile")).toBeInTheDocument();
    expect(
      screen.getByTestId("profileSettingDeleteButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("profileSettingChangeButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("profileSettingFileInput")).toBeInTheDocument();
  });
});
