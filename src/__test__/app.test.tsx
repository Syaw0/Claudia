import App from "../pages/index";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("TEST: home page", () => {
  it("just for fun :) ", () => {
    render(<App />);
  });
});
