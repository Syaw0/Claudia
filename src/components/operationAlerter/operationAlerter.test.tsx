import OperationAlerter from "./operationAlerter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";

const fakeAlerts1: MessageType[] = [
  { msg: "1", type: "error" },
  { msg: "2", type: "success" },
  { msg: "3", type: "loader" },
];

HTMLDivElement.prototype.scrollTo = jest.fn(() => {});

const CustomParent = () => {
  return (
    <Provider store={makeStore({ alerts: fakeAlerts1 })}>
      <OperationAlerter />
    </Provider>
  );
};

describe("TEST COMPONENT : OperationAlerter", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("operationAlerterHolder")).toBeInTheDocument();
    expect(screen.getByTestId("waitMessage")).toBeInTheDocument();
    expect(screen.getByTestId("successMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
  });

  it("pop messages", () => {
    render(<CustomParent />);
    const msg1 = screen.getByTestId("waitMessage");
    const msg2 = screen.getByTestId("successMessage");
    const msg3 = screen.getByTestId("errorMessage");

    screen.getAllByTestId("msgHolder").forEach(async (msg) => {
      fireEvent.click(
        msg.querySelector("[data-testid='closeIcon']") as Element
      );
      await waitFor(() => expect(msg).not.toBeInTheDocument());
    });
  });
});
