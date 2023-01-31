import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import IconDocx from "../../assets/icons/iconDocx";
import Text from "../typography/typography";
import style from "./sideInformation.module.css";

const SideInformation = () => {
  const { name, size, date } = useMycloudSelector((s) => s.sideData);
  return (
    <div data-testid="sideInformationHolder" className={style.holder}>
      <div className={style.iconHolder}>
        {/* //TODO we must use dynamic import for icon from name */}
        <IconDocx
          data-testid="sideInformationIcon"
          className={style.headIcon}
          width="93"
          height="100"
        />
      </div>

      <div data-testid="sideInformationToolbar">toolbar</div>

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
          <Text>{size}</Text>
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
