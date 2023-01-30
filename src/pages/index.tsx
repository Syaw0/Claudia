import LoginForm from "../components/login/login";
import Head from "next/head";
import ResetPassword from "../components/resetPassword/resetPassword";
import ForgetPassword from "../components/forgetPassword/forgetPassword";

export default function Home() {
  return (
    <>
      <Head>
        <title>Claudia</title>
        <meta name="description" content="Claudia home page" />
      </Head>
      <div>
        {/* <LoginForm /> */}
        {/* <Signup /> */}
        {/* <ResetPassword /> */}
        <ForgetPassword />
      </div>
    </>
  );
}
// * in this release home page redirect to the /mycloud
