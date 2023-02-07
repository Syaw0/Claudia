import CardHolder from "../../../components/cardHolder/cardHolder";
import MainLayout from "../../../components/layouts/mainLayout/mainLayout";
import MainHolder from "../../../components/mainHolder/mainHolder";
import SideInformation from "../../../components/sideInformation/sideInformation";
import StickyLeftNavbar from "../../../components/stickyLeftNavbar/stickyLeftNavbar";
import StickyTopNavbar from "../../../components/stickyTopNavbar/stickyTopNavbar";
import Toolbar from "../../../components/toolbar/toolbar";
import toolbarItems from "../../../shared/toolbarItems";
import style from "./mycloud.module.css";
import { useMycloudSelector } from "../../../store/mycloud/mycloudStoreHooks";
import IconCreateDirectory from "../../../assets/icons/IconCreateDirectory";
import useControlSelectFileState from "../../../hooks/controlSelectFileState";
import useChangeViewPortWidth from "../../../hooks/useChangeViewportWidth";
import FloatLayout from "../../../components/layouts/floatLayout/floatLayout";
import useCreateDirectory from "../../../hooks/useCreateDirectory";
import OperationAlerter from "../../../components/operationAlerter/operationAlerter";
import Text from "../../../components/typography/typography";
import { useRouter } from "next/router";

const Mycloud = () => {
  const router = useRouter();
  const isSideOpen = useMycloudSelector((s) => s.isSideOpen);
  const isFileSelected = useMycloudSelector((s) => s.isFileSelected);
  const isNavOpen = useMycloudSelector((s) => s.isNavOpen);
  const files = useMycloudSelector((s) => s.fileList);
  const cwd = useMycloudSelector((s) => s.cwd);
  let bread = cwd.split != null ? cwd.split("/") : [];
  bread[0] = "My cloud";
  useControlSelectFileState();
  useChangeViewPortWidth();
  const goTo = (b: any, i: any) => {
    let url: any = bread;
    url[0] = "mycloud";
    url = url.slice(0, i + 1).join("/");
    router.replace("/" + url);
  };
  return (
    <div className={style.holder}>
      <FloatLayout />
      <OperationAlerter />
      <MainLayout
        leftNavbar={isNavOpen ? <StickyLeftNavbar /> : <span></span>}
        side={isSideOpen ? <SideInformation /> : <span></span>}
        topNavbar={<StickyTopNavbar />}
        main={
          <MainHolder
            head={
              <>
                {bread.map((b, i) => {
                  return (
                    <Text
                      onClick={() => {
                        goTo(b, i);
                      }}
                      as="span"
                      key={b + i}
                    >
                      {b}
                    </Text>
                  );
                })}
              </>
            }
            rightHead={
              <div className={style.iconBar}>
                {isFileSelected && (
                  <Toolbar
                    className={style.selectFileToolbar}
                    items={toolbarItems}
                    isFromSide
                    isDirectory={false}
                  />
                )}
                <div className={style.createDirIcon}>
                  <IconCreateDirectory
                    onClick={useCreateDirectory()}
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            }
            subhead={``}
            content={<CardHolder cards={files} />}
          />
        }
      />
    </div>
  );
};

export default Mycloud;
