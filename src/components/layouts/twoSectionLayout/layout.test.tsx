import Layout from "./layout";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost, fakeUser } from "../../../shared/fakePost";
import Post from "../../post/post";
import TrendTags from "../../trendTags/trendTag";
import { Provider } from "react-redux";
import makeStore from "../../../store/user/userStore";

jest.mock("next/router", () => require("next-router-mock"));

const LeftChild = () => {
  return <Post isAuthors={true} testid="post" {...fakePost} />;
};

const RightChild = () => {
  return <TrendTags tags={["tag1", "tag2"]} />;
};

const CustomParent = () => {
  return (
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <Layout leftSide={<LeftChild />} rightSide={<RightChild />} />
    </Provider>
  );
};

describe("Component Test : Layout", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("layoutLeft")).toBeInTheDocument();
    expect(screen.getByTestId("layoutRight")).toBeInTheDocument();
    expect(screen.getByTestId("trendTagsHolder")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag1")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag2")).toBeInTheDocument();
    expect(screen.getByTestId("post")).toBeInTheDocument();
  });
});
