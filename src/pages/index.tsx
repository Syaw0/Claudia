import LoginForm from "../components/login/login";
import Head from "next/head";
import Signup from "@/components/signup/signup";

export default function Home() {
  return (
    <>
      <Head>
        <title>Claudia</title>
        <meta name="description" content="Claudia home page" />
      </Head>
      <div>
        {/* <LoginForm /> */}
        <Signup />
      </div>
    </>
  );
}
// * in this release home page redirect to the /mycloud
