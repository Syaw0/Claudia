import MainLayout from "../../../components/layouts/mainLayout/mainLayout";
import MainHolder from "../../../components/mainHolder/mainHolder";
import StickyLeftNavbar from "../../../components/stickyLeftNavbar/stickyLeftNavbar";
import StickyTopNavbar from "../../../components/stickyTopNavbar/stickyTopNavbar";
import { useMycloudSelector } from "../../../store/mycloud/mycloudStoreHooks";
import useControlSelectFileState from "../../../hooks/controlSelectFileState";
import useChangeViewPortWidth from "../../../hooks/useChangeViewportWidth";
import FloatLayout from "../../../components/layouts/floatLayout/floatLayout";
import OperationAlerter from "../../../components/operationAlerter/operationAlerter";
import style from "./setting.module.css";
import SettingHolder from "../../../components/settingHolder/settingHolder";

const Setting = () => {
  const isNavOpen = useMycloudSelector((s) => s.isNavOpen);
  useControlSelectFileState();
  useChangeViewPortWidth();
  return (
    <div className={style.holder}>
      <FloatLayout />
      <OperationAlerter />
      {/* {isGlobalMsgOpen && <Message />} */}
      <MainLayout
        leftNavbar={isNavOpen ? <StickyLeftNavbar /> : <span></span>}
        side={<span></span>}
        topNavbar={<StickyTopNavbar />}
        main={
          <MainHolder
            head="Setting"
            rightHead={<span></span>}
            subhead={``}
            content={<SettingHolder />}
          />
        }
      />
    </div>
  );
};

export default Setting;
