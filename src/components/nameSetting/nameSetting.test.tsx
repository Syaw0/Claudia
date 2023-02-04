import NameSetting from "./nameSetting";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import mycloudFakeProps from "../../shared/mycloudFakeProps";
import makeStore from "../../store/mycloud/mycloudStore";

const CustomParent = () => {
  return (
    <Provider store={makeStore(mycloudFakeProps)}>
      <NameSetting />
    </Provider>
  );
};

describe("TEST COMPONENT : Name Setting ", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("nameSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("nameSettingInput")).toBeInTheDocument();
    expect(screen.getByTestId("nameSettingButton")).toBeInTheDocument();
  });
});
