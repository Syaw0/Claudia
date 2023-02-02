import makeStore from "../../store/mycloud/mycloudStore";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Rename from "./rename";
import rename from "../../utils/rename";

jest.mock("../../utils/rename");

const renameMock = rename as jest.Mock;

const preState = {
  selectedFileData: { name: "this is it", date: "0", size: 0, type: "file" },
};

const CustomParent = () => {
  return (
    <Provider store={makeStore(preState)}>
      <Rename />
    </Provider>
  );
};

describe("TEST COMPONENT : Rename ", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("renameHolder")).toBeInTheDocument();
    expect(screen.getByTestId("renameInput")).toBeInTheDocument();
    expect(screen.getByTestId("renameCancelButton")).toBeInTheDocument();
    expect(screen.getByTestId("renameButton")).toBeInTheDocument();
  });

  it("lets play with it", async () => {
    renameMock.mockReturnValue(new Promise((res) => res({ status: false })));
    render(<CustomParent />);
    const input = screen.getByTestId("renameInput");
    const renameButton = screen.getByTestId("renameButton");

    //in the first time input has a selected file name!
    expect(input).toHaveValue(preState.selectedFileData.name);
    // if click on the rename we got error because these are same
    fireEvent.click(renameButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    //emptiness
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(renameButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "somethingElse" } });
    fireEvent.click(renameButton);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    renameMock.mockReturnValue(new Promise((res) => res({ status: true })));

    fireEvent.click(renameButton);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
