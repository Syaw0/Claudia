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
import { useMycloudSelector } from "@/store/mycloud/mycloudStoreHooks";

const Mycloud = () => {
  const isSideOpen = useMycloudSelector((s) => s.isSideOpen);
  return (
    <div className={style.holder}>
      <MainLayout
        leftNavbar={<StickyLeftNavbar />}
        side={isSideOpen ? <SideInformation /> : <span></span>}
        topNavbar={<StickyTopNavbar />}
        main={
          <MainHolder
            head="My Cloud"
            rightHead={<Toolbar items={toolbarItems} isFromSide type="file" />}
            subhead={``}
            content={<CardHolder cards={fakeCards} />}
          />
        }
      />
    </div>
  );
};

export default Mycloud;
