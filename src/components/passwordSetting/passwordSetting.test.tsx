import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";
import PasswordSetting from "./passwordSetting";

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <PasswordSetting />
    </Provider>
  );
};

describe("TEST COMPONENT : Password Setting", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("passwordSettingHolder"));
    expect(screen.getByTestId("passwordSettingCurrentPassword"));
    expect(screen.getByTestId("passwordSettingNewPassword"));
    expect(screen.getByTestId("passwordSettingRetypePassword"));
    expect(screen.getByTestId("passwordSettingButton"));
  });
});
