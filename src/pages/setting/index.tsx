import Setting from "../../components/pageComponents/setting/setting";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../../store/mycloud/mycloudStore";
import mycloudFakeProps from "../../shared/mycloudFakeProps";

const SettingPage = () => {
  return (
    <>
      <Head>
        <title>Setting</title>
        <meta name="description" content="Claudia Setting page" />
      </Head>

      <Provider store={makeStore(mycloudFakeProps)}>
        <Setting />
      </Provider>
    </>
  );
};

export default SettingPage;
