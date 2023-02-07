import Mycloud from "../../../components/pageComponents/mycloud/mycloud";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore, { RootState } from "../../../store/mycloud/mycloudStore";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import checkSession from "../../../../db/util/checkSession";
import getUserById from "../../../../db/util/getUserById";
import listAllFilesInDirectory from "../../../../server/util/listAllFilesInDirectory";
import getUsedVolume from "../../../../server/util/getUsedVolume";
import isDirectoryExist from "server/util/isDirectoryExist";
import path from "path";

const RestMyCloud = (props: Partial<RootState>) => {
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
  params,
}): Promise<GetServerSidePropsResult<Partial<RootState>>> => {
  const sessionCheckResult = await checkSession(req.cookies);
  if (!sessionCheckResult.status) {
    return { redirect: { destination: "/auth", permanent: false } };
  }
  const userData = await getUserById(sessionCheckResult.data as string);
  if (!userData.status) {
    return { redirect: { destination: "/auth", permanent: false } };
  }
  let formatParams: any = params;
  if (formatParams.dir != null) {
    formatParams = formatParams.dir.join("/");
  } else {
    formatParams = "";
  }
  let cwd = path.join(`${userData.data.userId}`, formatParams);
  const isDirExist = isDirectoryExist(cwd);
  if (!isDirExist.status) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const list = listAllFilesInDirectory(cwd);
  const usedVolume = getUsedVolume(userData.data.userId);
  return {
    props: {
      alerts: [],
      cwd: cwd,
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

export default RestMyCloud;
