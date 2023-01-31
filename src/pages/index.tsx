import StickyLeftNavbar from "../components/stickyLeftNavbar/stickyLeftNavbar";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/mycloud/mycloudStore";
import StickyTopNavbar from "../components/stickyTopNavbar/stickyTopNavbar";
import mycloudFakeProps from "../shared/mycloudFakeProps";

export default function Home() {
  return (
    <>
      <Head>
        <title>Claudia</title>
        <meta name="description" content="Claudia home page" />
      </Head>
      <Provider store={makeStore(mycloudFakeProps)}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            backgroundColor: "",
            width: "100%",
          }}
        >
          <StickyLeftNavbar />
          <div style={{ width: "100%" }}>
            <StickyTopNavbar />
          </div>
        </div>
      </Provider>
    </>
  );
}
// * in this release home page redirect to the /mycloud
