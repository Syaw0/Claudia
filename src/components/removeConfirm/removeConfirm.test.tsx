import makeStore from "../../store/mycloud/mycloudStore";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import RemoveConfirm from "./removeConfirm";
import remove from "../../utils/remove";

jest.mock("../../utils/remove");

const removeMock = remove as jest.Mock;

const preState = {
  selectedFileData: { name: "this is it", date: "0", size: 0, type: "file" },
};

const CustomParent = () => {
  return (
    <Provider store={makeStore(preState)}>
      <RemoveConfirm />
    </Provider>
  );
};

describe("TEST COMPONENT : Remove ", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("removeConfirmHolder")).toBeInTheDocument();
    expect(screen.getByTestId("removeConfirmCancelButton")).toBeInTheDocument();
    expect(screen.getByTestId("removeConfirmButton")).toBeInTheDocument();
    expect(screen.getByTestId("removeConfirmHolder")).toHaveTextContent(
      preState.selectedFileData.name
    );
  });

  it("lets play with it", async () => {
    removeMock.mockReturnValue(new Promise((res) => res({ status: false })));
    render(<CustomParent />);
    const removeButton = screen.getByTestId("removeConfirmButton");

    fireEvent.click(removeButton);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    removeMock.mockReturnValue(new Promise((res) => res({ status: true })));

    fireEvent.click(removeButton);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
