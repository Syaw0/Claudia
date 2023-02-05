import Mycloud from "../../components/pageComponents/mycloud/mycloud";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore, { RootState } from "../../store/mycloud/mycloudStore";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import checkSession from "../../../db/util/checkSession";
import getUserById from "../../../db/util/getUserById";
import listAllFilesInDirectory from "../../../server/util/listAllFilesInDirectory";
import getUsedVolume from "../../../server/util/getUsedVolume";

const MyCloudPage = (props: any) => {
  return (
    <>
      <Head>
        <title>My Cloud</title>
        <meta name="description" content="Claudia dashboard page" />
      </Head>

      <Provider store={makeStore(props)}>
        <Mycloud />
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

  const list = listAllFilesInDirectory(userData.data.userId);
  const usedVolume = getUsedVolume(userData.data.userId);
  console.log(usedVolume);
  return {
    props: {
      user: {
        id: userData.data.userId,
        name: userData.data.name,
        profileUrl: userData.data.profileUrl,
      },
      fileList: list,
      storageUsage: {
        max: 10000,
        min: Number(usedVolume),
      },
    },
  };
};

export default MyCloudPage;
