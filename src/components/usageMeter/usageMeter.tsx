import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import mgbToGb from "../../utils/mgbToGb";
import { useEffect, useRef } from "react";
import Text from "../typography/typography";
import style from "./usageMeter.module.css";

const UsageMeter = () => {
  const { min, max } = useMycloudSelector((s) => s.storageUsage);

  const progressHolder: any = useRef(null);
  // we can event use hook and remove these lines
  useEffect(() => {
    const progressHolderWidth = progressHolder.current.clientWidth;
    const progressBarWidth = (progressHolderWidth / max) * min;
    progressHolder.current.getElementsByTagName(
      "div"
    )[0].style.width = `${progressBarWidth}px`;
  }, [max, min]);
  return (
    <div data-testid="usageMeterHolder" className={style.holder}>
      <Text
        testid="usageMeterHeadText"
        className={style.headText}
        variant="headline6"
      >
        Storage Usage
      </Text>
      <div
        data-testid="usageMeterProgressHolder"
        ref={progressHolder}
        className={style.progressHolder}
      >
        <div
          data-testid="usageMeterProgressBar"
          className={style.progressBar}
        ></div>
      </div>
      <Text testid="usageMeterBottomText" className={style.bottomText}>
        {mgbToGb(min)} of {mgbToGb(max)}
      </Text>
    </div>
  );
};

export default UsageMeter;
