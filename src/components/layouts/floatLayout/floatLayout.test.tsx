import FloatLayout from "./floatLayout";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../../store/mycloud/mycloudStore";

const preState = {
  selectedFileData: { name: "this is it", date: "0", size: 0, type: "file" },
  floatType: "edit",
};

// @ts-ignore
window.Animation = () => ({});

type Animated = (
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions | undefined
) => Animation;

const mockAnimated: Animated = (x, y) => {
  return new Animation();
};

HTMLDivElement.prototype.animate = mockAnimated;

const CustomParent = () => {
  return (
    <Provider store={makeStore(preState)}>
      <FloatLayout />
    </Provider>
  );
};

describe("TEST COMPONENT : FloatLayout", () => {
  it("its render properly", () => {
    render(<CustomParent />);

    expect(screen.getByTestId("floatLayout")).toBeInTheDocument();
    expect(screen.getByTestId("renameHolder")).toBeInTheDocument();
    expect(screen.getByTestId("renameInput")).toBeInTheDocument();
    expect(screen.getByTestId("renameCancelButton")).toBeInTheDocument();
    expect(screen.getByTestId("renameButton")).toBeInTheDocument();
  });

  it("Rename In The Float ", async () => {
    jest.useFakeTimers();
    render(<CustomParent />);
    const floatLayout = screen.getByTestId("floatLayout");
    const renameHolder = screen.getByTestId("renameHolder");
    const cancelButton = screen.getByTestId("renameCancelButton");
    expect(floatLayout).toBeInTheDocument();
    expect(renameHolder).toBeInTheDocument();

    // if click on the cancel(in the rename ) float will close...
    fireEvent.click(cancelButton);
    jest.runAllTimers();
    await waitFor(() => expect(floatLayout).not.toBeInTheDocument());

    await waitFor(() => expect(renameHolder).not.toBeInTheDocument());
  });
});
