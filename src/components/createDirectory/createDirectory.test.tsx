import makeStore from "../../store/mycloud/mycloudStore";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import CreateDirectory from "./createDirectory";
import createDirectory from "../../utils/createDirectory";

jest.mock("../../utils/createDirectory");

const createDirectoryMock = createDirectory as jest.Mock;

const preState = {
  selectedFileData: {
    name: "this is it",
    date: "0",
    size: 0,
    isDirectory: false,
  },
};

const CustomParent = () => {
  return (
    <Provider store={makeStore(preState)}>
      <CreateDirectory />
    </Provider>
  );
};

describe("TEST COMPONENT : Remove ", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("createDirectoryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("createDirectoryInput")).toBeInTheDocument();
    expect(
      screen.getByTestId("createDirectoryCancelButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("createDirectoryButton")).toBeInTheDocument();
  });

  it("lets play with it", async () => {
    createDirectoryMock.mockReturnValue(
      new Promise((res) => res({ status: false }))
    );
    render(<CustomParent />);
    const input = screen.getByTestId("createDirectoryInput");
    const createDirButton = screen.getByTestId("createDirectoryButton");

    //emptiness
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(createDirButton);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "somethingElse" } });
    fireEvent.click(createDirButton);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    createDirectoryMock.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );

    fireEvent.click(createDirButton);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
