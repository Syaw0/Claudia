import Authentication from "../../components/pageComponents/authentication/authentication";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../../store/authentication/authenticationStore";

const AuthenticationPage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Claudia Authentication page" />
      </Head>
      <Provider store={makeStore()}>
        <Authentication />
      </Provider>
    </>
  );
};

export default AuthenticationPage;
