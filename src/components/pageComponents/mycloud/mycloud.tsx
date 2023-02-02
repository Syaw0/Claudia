import fakeCards from "../../../shared/fakecards";
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
import Message from "@/components/message_v2/message";
import { useDispatch } from "react-redux";

const Mycloud = () => {
  const isSideOpen = useMycloudSelector((s) => s.isSideOpen);
  const isGlobalMsgOpen = useMycloudSelector((s) => s.isGlobalMsgOpen);
  const isFileSelected = useMycloudSelector((s) => s.isFileSelected);
  const isNavOpen = useMycloudSelector((s) => s.isNavOpen);
  useControlSelectFileState();
  useChangeViewPortWidth();
  const dispatch = useDispatch();

  console.log(isGlobalMsgOpen);
  return (
    <div className={style.holder}>
      <FloatLayout />
      {isGlobalMsgOpen && <Message />}
      <MainLayout
        leftNavbar={isNavOpen ? <StickyLeftNavbar /> : <span></span>}
        side={isSideOpen ? <SideInformation /> : <span></span>}
        topNavbar={<StickyTopNavbar />}
        main={
          <MainHolder
            head="My Cloud"
            rightHead={
              <div className={style.iconBar}>
                {isFileSelected && (
                  <Toolbar
                    className={style.selectFileToolbar}
                    items={toolbarItems}
                    isFromSide
                    type="file"
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
            content={<CardHolder cards={fakeCards} />}
          />
        }
      />
    </div>
  );
};

export default Mycloud;
