import NameSetting from "../nameSetting/nameSetting";
import PasswordSetting from "../passwordSetting/passwordSetting";
import ProfileSetting from "../profileSetting/profileSetting";
import style from "./settingHolder.module.css";

const SettingHolder = () => {
  return (
    <div className={style.holder}>
      <ProfileSetting />
      <NameSetting />
      <PasswordSetting />
    </div>
  );
};

export default SettingHolder;