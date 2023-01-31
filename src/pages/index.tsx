import StickyLeftNavbar from "../components/stickyLeftNavbar/stickyLeftNavbar";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store/mycloud/mycloudStore";

export default function Home() {
  return (
    <>
      <Head>
        <title>Claudia</title>
        <meta name="description" content="Claudia home page" />
      </Head>
      <Provider store={makeStore({ storageUsage: { max: 1000, min: 120 } })}>
        <div style={{ height: "100vh", backgroundColor: "", width: "100%" }}>
          <StickyLeftNavbar />
        </div>
      </Provider>
    </>
  );
}
// * in this release home page redirect to the /mycloud
