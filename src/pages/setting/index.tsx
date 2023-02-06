import Setting from "../../components/pageComponents/setting/setting";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore, { RootState } from "../../store/mycloud/mycloudStore";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import checkSession from "../../../db/util/checkSession";
import getUserById from "../../../db/util/getUserById";
import getUsedVolume from "../../../server/util/getUsedVolume";

const SettingPage = (props: Partial<RootState>) => {
  return (
    <>
      <Head>
        <title>Setting</title>
        <meta name="description" content="Claudia Setting page" />
      </Head>

      <Provider store={makeStore(props)}>
        <Setting />
      </Provider>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<GetServerSidePropsResult<Partial<RootState>>> => {
  const sessionCheckResult = await checkSession(req.cookies);
  if (!sessionCheckResult.status) {
    return { redirect: { destination: "/auth", permanent: false } };
  }
  const userData = await getUserById(sessionCheckResult.data as string);
  if (!userData.status) {
    return { redirect: { destination: "/auth", permanent: false } };
  }

  const usedVolume = getUsedVolume(userData.data.userId);
  return {
    props: {
      cwd: userData.data.userId,
      user: {
        id: userData.data.userId,
        name: userData.data.name,
        profileUrl: userData.data.profileUrl,
      },
      storageUsage: {
        max: 10000,
        min: Number(usedVolume),
      },
    },
  };
};
export default SettingPage;
