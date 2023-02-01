import Mycloud from "../../components/pageComponents/mycloud/mycloud";
import Head from "next/head";
import { Provider } from "react-redux";
import mycloudFakeProps from "../../shared/mycloudFakeProps";
import makeStore from "../../store/mycloud/mycloudStore";

const MyCloudPage = () => {
  return (
    <>
      <Head>
        <title>My Cloud</title>
        <meta name="description" content="Claudia dashboard page" />
      </Head>

      <Provider store={makeStore(mycloudFakeProps)}>
        <Mycloud />
      </Provider>
    </>
  );
};

export default MyCloudPage;
