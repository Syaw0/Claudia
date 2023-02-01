import StickyLeftNavbar from "../components/stickyLeftNavbar/stickyLeftNavbar";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/mycloud/mycloudStore";
import StickyTopNavbar from "../components/stickyTopNavbar/stickyTopNavbar";
import mycloudFakeProps from "../shared/mycloudFakeProps";
import SideInformation from "../components/sideInformation/sideInformation";
import Card from "../components/card/card";
import MainLayout from "../components/layouts/mainLayout/mainLayout";
import MainHolder from "../components/mainHolder/mainHolder";
import Toolbar from "@/components/toolbar/toolbar";
import toolbarItems from "@/shared/toolbarItems";
import CardHolder from "@/components/cardHolder/cardHolder";

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
            <MainHolder
              head="My Cloud"
              rightHead={
                <Toolbar items={toolbarItems} isFromSide type="file" />
              }
              subhead={``}
              content={
                <CardHolder
                  cards={[
                    { name: "file", date: "2", type: "dir" },
                    { name: "file", date: "2", type: "dir" },
                    { name: "file", date: "2", type: "dir" },
                  ]}
                />
              }
            />
          }
        />
      </Provider>
    </>
  );
}
// * in this release home page redirect to the /mycloud
