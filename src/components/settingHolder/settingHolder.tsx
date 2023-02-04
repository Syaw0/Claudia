import ProfileSetting from "../profileSetting/profileSetting";
import style from "./settingHolder.module.css";

const SettingHolder = () => {
  return (
    <div className={style.holder}>
      <ProfileSetting />
    </div>
  );
};

export default SettingHolder;
