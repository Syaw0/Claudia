import MyCloudPage from "../../pages/mycloud";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mycloudFakeProps from "../../shared/mycloudFakeProps";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import mockRouter from "next-router-mock";
import download from "../../utils/download";
import starOrUnStar from "../../utils/starOrUnStar";
import makeCopy from "../../utils/makeCopy";

jest.mock("../../utils/download.ts");
jest.mock("../../utils/starOrUnStar.ts");
jest.mock("../../utils/makeCopy.ts");
const mockStar = starOrUnStar as jest.Mock;
const mockMakeCopy = makeCopy as jest.Mock;
const mockDownload = download as jest.Mock;

HTMLDivElement.prototype.scrollTo = jest.fn();
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

jest.useFakeTimers();

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: any) => {
  return <MyCloudPage {...props} />;
};

describe("TEST PAGE : Mycloud", () => {
  it("its render properly in default ", () => {
    render(<CustomParent {...mycloudFakeProps} />);
    expect(screen.getByTestId("stickyLeftNavbar")).toBeInTheDocument();
    expect(screen.getByTestId("stickyTopNavbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("mainHolder")).toBeInTheDocument();
    expect(screen.getByTestId("operationAlerterHolder")).toBeInTheDocument();
    expect(screen.getByTestId("cardHolder_file")).toBeInTheDocument();
    expect(screen.getByTestId("cardHolder_file1")).toBeInTheDocument();
    let side;
    try {
      side = screen.getByTestId("sideInformationHolder");
    } catch (err) {}
    expect(side).toBeUndefined();
  });

  it("navigation", () => {
    render(<CustomParent {...mycloudFakeProps} />, {
      wrapper: MemoryRouterProvider,
    });
    const mycloudBtn = screen.getByTestId("navbarItemAnchor/mycloud");
    const allFilsBtn = screen.getByTestId("navbarItemAnchor/allFiles");
    const favBtn = screen.getByTestId("navbarItemAnchor/fav");
    const settingBtn = screen.getByTestId("navbarItemAnchor/setting");

    fireEvent.click(allFilsBtn);
    expect(mockRouter.asPath).toEqual("/allFiles");

    fireEvent.click(mycloudBtn);
    expect(mockRouter.asPath).toEqual("/mycloud");

    fireEvent.click(favBtn);
    expect(mockRouter.asPath).toEqual("/fav");

    fireEvent.click(settingBtn);
    expect(mockRouter.asPath).toEqual("/setting");
  });

  it("click on the card and side show up", async () => {
    render(<CustomParent {...mycloudFakeProps} />);
    const card = screen.getByTestId("cardHolder_file");
    fireEvent.click(card);
    const side = screen.getByTestId("sideInformationHolder");
    expect(side).toBeInTheDocument();
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.click(screen.getByTestId("sideInfoCloseIcon"));
    await waitFor(() => expect(side).not.toBeInTheDocument());
  });

  it("lets check toolbar items (Directory)", async () => {
    render(<CustomParent {...mycloudFakeProps} />);
    const card = screen.getByTestId("cardHolder_file");
    fireEvent.click(card);
    const side = screen.getByTestId("sideInformationHolder");
    const info = side.querySelector(
      '[data-testid="toolbarItem_info"]'
    ) as Element;
    const rename = screen.getByTestId("toolbarItem_Rename Dir");
    const rmDir = screen.getByTestId("toolbarItem_Delete Dir");

    fireEvent.click(info);
    const float = screen.getByTestId("floatLayout");
    expect(float).toBeInTheDocument();
    jest.useFakeTimers();
    fireEvent.click(screen.getByTestId("infoQuitButton"));
    jest.runAllTimers();
    expect(float).not.toBeInTheDocument();

    fireEvent.click(rename);
    expect(screen.getByTestId("floatLayout")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("renameCancelButton"));
    jest.runAllTimers();
    expect(float).not.toBeInTheDocument();

    fireEvent.click(rmDir);
    expect(screen.getByTestId("floatLayout")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("removeConfirmCancelButton"));
    jest.runAllTimers();
    expect(float).not.toBeInTheDocument();
  });

  it("lets check toolbar items (Files)", async () => {
    render(<CustomParent {...mycloudFakeProps} />);
    const card = screen.getByTestId("cardHolder_file3");
    fireEvent.click(card);
    const side = screen.getByTestId("sideInformationHolder");
    const info = side.querySelector(
      '[data-testid="toolbarItem_info"]'
    ) as Element;
    const rmFile = side.querySelector(
      '[data-testid="toolbarItem_Delete File"]'
    ) as Element;
    const downloadFile = side.querySelector(
      '[data-testid="toolbarItem_Download"]'
    ) as Element;

    const makeCopy = side.querySelector(
      '[data-testid="toolbarItem_Make Copy"]'
    ) as Element;
    const renameFile = side.querySelector(
      '[data-testid="toolbarItem_Rename File"]'
    ) as Element;
    const star = side.querySelector(
      '[data-testid="toolbarItem_Star"]'
    ) as Element;

    fireEvent.click(info);
    const float = screen.getByTestId("floatLayout");
    expect(float).toBeInTheDocument();
    jest.useFakeTimers();
    fireEvent.click(screen.getByTestId("infoQuitButton"));
    jest.runAllTimers();
    expect(float).not.toBeInTheDocument();

    fireEvent.click(renameFile);
    expect(screen.getByTestId("floatLayout")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("renameCancelButton"));
    jest.runAllTimers();
    expect(float).not.toBeInTheDocument();

    fireEvent.click(rmFile);
    expect(screen.getByTestId("floatLayout")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("removeConfirmCancelButton"));
    jest.runAllTimers();
    expect(float).not.toBeInTheDocument();

    mockDownload.mockReturnValue(new Promise((res) => res({ status: false })));
    fireEvent.click(downloadFile);
    expect(mockDownload).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockDownload.mockReturnValue(new Promise((res) => res({ status: true })));
    fireEvent.click(downloadFile);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );

    mockStar.mockReturnValue(new Promise((res) => res({ status: false })));
    fireEvent.click(star);
    expect(mockStar).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockStar.mockReturnValue(new Promise((res) => res({ status: true })));
    fireEvent.click(star);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );

    mockMakeCopy.mockReturnValue(new Promise((res) => res({ status: false })));
    fireEvent.click(makeCopy);
    expect(mockMakeCopy).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    mockMakeCopy.mockReturnValue(new Promise((res) => res({ status: true })));
    fireEvent.click(makeCopy);
    await waitFor(() =>
      expect(screen.getAllByTestId("successMessage").length).toBeGreaterThan(1)
    );
  });
});
