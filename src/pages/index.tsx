import StickyLeftNavbar from "../components/stickyLeftNavbar/stickyLeftNavbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Claudia</title>
        <meta name="description" content="Claudia home page" />
      </Head>
      <div style={{ height: "100vh", backgroundColor: "", width: "100%" }}>
        <StickyLeftNavbar />
      </div>
    </>
  );
}
// * in this release home page redirect to the /mycloud
