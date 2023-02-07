import NavbarItem from "./stickyLeftNavbarItem";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import router from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

describe("TEST COMPONENT : stickyLeftNavbarItem", () => {
  it("its render properly", async () => {
    await waitFor(() =>
      render(
        <NavbarItem
          testId="homeNavbarItem"
          text="Home"
          Icon={() => <div data-testid="icon"></div>}
          href="/home"
        />,
        { wrapper: MemoryRouterProvider }
      )
    );
    expect(screen.getByTestId("homeNavbarItem")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("navbarItemText")).toHaveTextContent("Home");
    fireEvent.click(screen.getByTestId("navbarItemAnchor/home"));
    await waitFor(() => expect(router.asPath).toEqual("/home"));
  });
});
