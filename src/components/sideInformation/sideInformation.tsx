import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import IconDocx from "../../assets/icons/iconDocx";
import Text from "../typography/typography";
import style from "./sideInformation.module.css";
import Toolbar from "../toolbar/toolbar";
import toolbarItems from "../../shared/toolbarItems";
import IconClose from "../../assets/icons/iconClose";
import { useDispatch } from "react-redux";
import { toggleSideInfoAction } from "../../store/mycloud/mycloudStore";
import { useRef } from "react";
import {
  keyframeTranslateToRight,
  timingTranslateToRight,
} from "../../styles/keyframes/translate";
import byteToMgb from "../../utils/byteToMgb";

const SideInformation = () => {
  const ref: any = useRef(null);
  const { name, size, date, isDirectory } = useMycloudSelector(
    (s) => s.sideData
  );
  const dispatch = useDispatch();
  const closeSideInfo = () => {
    if (ref.current != null) {
      ref.current.animate(keyframeTranslateToRight, timingTranslateToRight);
    }
    setTimeout(() => {
      dispatch(toggleSideInfoAction(false));
    }, 800);
  };
  return (
    <div ref={ref} data-testid="sideInformationHolder" className={style.holder}>
      <div className={style.iconHolder}>
        <IconClose
          onClick={closeSideInfo}
          className={style.closeIcon}
          data-testid="sideInfoCloseIcon"
          width="25"
          height="25"
        />
        {/* //TODO we must use dynamic import for icon from name */}
        <IconDocx
          data-testid="sideInformationIcon"
          className={style.headIcon}
          width="93"
          height="100"
        />
      </div>
      {/* //*this toolbar is just for files! not directory */}
      <div data-testid="sideInformationToolbar">
        <Toolbar isDirectory={isDirectory} isFromSide items={toolbarItems} />
      </div>

      <div
        data-testid="sideInformationMainInfo"
        className={style.mainInformation}
      >
        <Text variant="headline5">{name}</Text>
        <Text variant="subhead2">{name}</Text>
      </div>

      <div data-testid="sideInformationDetail" className={style.detail}>
        <Text variant="headline6">Information</Text>
        <div className={style.detailItem}>
          <Text>Size</Text>
          {/* //TODO turn size to Gb if its larger than 1000 */}
          <Text>{byteToMgb(size)} Mgb</Text>
        </div>

        <div className={style.detailItem}>
          <Text>Date</Text>
          <Text>{date}</Text>
        </div>
      </div>
    </div>
  );
};

export default SideInformation;
