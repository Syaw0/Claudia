import Authentication from "../../components/pageComponents/Authentication/Authentication";
import Head from "next/head";

const AuthenticationPage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Claudia Authentication page" />
      </Head>

      <Authentication />
    </>
  );
};

export default AuthenticationPage;
