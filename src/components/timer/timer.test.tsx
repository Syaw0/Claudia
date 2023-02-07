import Timer from "./timer";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";

const CustomParent = ({ startTime = 10 }: any) => {
  const [timer, setTimer] = useState(startTime);

  return <Timer setTime={setTimer} time={timer} />;
};

describe("TEST COMPONENT : Timer ", () => {
  it("its render perfectly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    jest.useFakeTimers();
  });
  it("if it reach to 0 timer must disappear", async () => {
    render(<CustomParent startTime={0} />);
    let timer: any;
    try {
      timer = screen.getByTestId("timer");
    } catch (err) {}
    await waitFor(() => expect(timer).toBeUndefined());
  });
});
