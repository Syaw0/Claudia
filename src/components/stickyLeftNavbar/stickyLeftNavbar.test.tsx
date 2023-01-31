import Navbar from "./stickyLeftNavbar";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";

const CustomParent = () => {
  return (
    <Provider store={makeStore({ storageUsage: { min: 100, max: 1000 } })}>
      <Navbar />
    </Provider>
  );
};

describe("TEST COMPONENT : stickyLeftNavbar", () => {
  it("its render properly", async () => {
    await waitFor(() => render(<CustomParent />));
    expect(screen.getByTestId("stickyLeftNavbar")).toBeInTheDocument();
    expect(screen.getByTestId("stickyLeftNavbarTop")).toBeInTheDocument();
    expect(screen.getByTestId("stickyLeftNavbarMiddle")).toBeInTheDocument();
    expect(screen.getByTestId("stickyLeftBottom")).toBeInTheDocument();

    expect(screen.getByTestId("leftNavbarItem/mycloud")).toBeInTheDocument();
    expect(screen.getByTestId("leftNavbarItem/fav")).toBeInTheDocument();
    expect(screen.getByTestId("leftNavbarItem/setting")).toBeInTheDocument();
    expect(screen.getByTestId("leftNavbarItem/allFiles")).toBeInTheDocument();
  });
});
