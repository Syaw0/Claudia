import StickyLeftNavbar from "../components/stickyLeftNavbar/stickyLeftNavbar";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/mycloud/mycloudStore";
import StickyTopNavbar from "../components/stickyTopNavbar/stickyTopNavbar";
import mycloudFakeProps from "../shared/mycloudFakeProps";
import SideInformation from "../components/sideInformation/sideInformation";
import Card from "../components/card/card";

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
            display: "flex",
            backgroundColor: "",
            width: "100%",
            height: "100vh",
            minHeight: "100vh",
            maxHeight: "100vh",
          }}
        >
          <StickyLeftNavbar />
          <div
            style={{
              width: "100%",
              height: "100vh",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <StickyTopNavbar />
            <div
              style={{
                width: "100%",
                position: "relative",
                display: "flex",
                height: "100%",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200vh",
                  overflow: "auto",
                }}
              >
                <h1>data</h1>
                <h1>data</h1>
                <h1>data</h1>
                <Card date="2022-22-22" name="Png File" type="dir" />
              </div>
              <SideInformation />
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}
// * in this release home page redirect to the /mycloud
