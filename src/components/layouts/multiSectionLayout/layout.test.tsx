import Layout from "./layout";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const fakeData = [
  { sectionName: "Write", component: <div>section1 Component</div> },
  { sectionName: "Preview", component: <div>section2 Component</div> },
  { sectionName: "section3", component: <div>section3 Component</div> },
  { sectionName: "section4", component: <div>section4 Component</div> },
];

const topNavExtraComponent = <div data-testid="someButton"></div>;

const CustomParent = () => {
  return (
    <Layout topNavExtraComponent={topNavExtraComponent} layoutData={fakeData} />
  );
};

describe("Component Test : Layout-Multiple Section", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("layoutMultipleHolder")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleBottom")).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleTop")).toBeInTheDocument();
    expect(screen.getByTestId("someButton")).toBeInTheDocument();
    expect(screen.getByTestId(fakeData[0].sectionName)).toBeInTheDocument();
    expect(screen.getByTestId(fakeData[1].sectionName)).toBeInTheDocument();
    expect(screen.getByTestId(fakeData[2].sectionName)).toBeInTheDocument();
    expect(screen.getByTestId(fakeData[3].sectionName)).toBeInTheDocument();
  });

  it("in default index 0 will render ,lets test if click on the section ,its component render", () => {
    render(<CustomParent />);
    expect(screen.getByTestId(fakeData[0].sectionName)).toBeInTheDocument();
    expect(screen.getByTestId("layoutMultipleBottom")).toHaveTextContent(
      "section1 Component"
    );
    fireEvent.click(screen.getByTestId(fakeData[1].sectionName));
    expect(screen.getByTestId("layoutMultipleBottom")).toHaveTextContent(
      "section2 Component"
    );

    fireEvent.click(screen.getByTestId(fakeData[2].sectionName));
    expect(screen.getByTestId("layoutMultipleBottom")).toHaveTextContent(
      "section3 Component"
    );

    fireEvent.click(screen.getByTestId(fakeData[3].sectionName));
    expect(screen.getByTestId("layoutMultipleBottom")).toHaveTextContent(
      "section4 Component"
    );
  });
});
