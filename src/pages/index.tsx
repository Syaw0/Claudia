import StickyLeftNavbar from "../components/stickyLeftNavbar/stickyLeftNavbar";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/mycloud/mycloudStore";
import StickyTopNavbar from "../components/stickyTopNavbar/stickyTopNavbar";
import mycloudFakeProps from "../shared/mycloudFakeProps";
import SideInformation from "../components/sideInformation/sideInformation";
import Card from "../components/card/card";
import MainLayout from "@/components/layouts/mainLayout/mainLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Claudia</title>
        <meta name="description" content="Claudia home page" />
      </Head>
      <Provider store={makeStore(mycloudFakeProps)}>
        <MainLayout
          leftNavbar={<StickyLeftNavbar />}
          side={<SideInformation />}
          topNavbar={<StickyTopNavbar />}
          main={
            <div
              style={{
                width: "100%",
                height: "200vh",
                overflow: "auto",
              }}
            >
              <Card date="2022-22-22" name="Png File" type="dir" />
            </div>
          }
        />
      </Provider>
    </>
  );
}
// * in this release home page redirect to the /mycloud
