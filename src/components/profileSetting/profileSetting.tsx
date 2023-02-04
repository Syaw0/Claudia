import useFetch from "../../hooks/useFetch";
import { insertAlert } from "../../store/mycloud/mycloudStore";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import changeProfile, { loaderMsg } from "../../utils/changeProfile";
import deleteProfile, {
  loaderMsg as deleteLoader,
} from "../../utils/deleteProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../button/button";
import Profile from "../profile/profile";
import style from "./profileSetting.module.css";
import Text from "../typography/typography";

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg] = useFetch(
    [deleteProfile, changeProfile],
    [deleteLoader, loaderMsg]
  );

  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ type: state, msg }));
    }
  }, [dispatch, msg, state]);

  // const changeProf = async () => {
  //   const res = await trigger(1);
  // };
  const deleteProf = async () => {
    const res = await trigger(0);
  };
  const changeFile = async () => {
    //change profile
    const res = await trigger(1);
  };
  const user = useMycloudSelector((s) => s.user);
  return (
    <div className={style.holder} data-testid="profileSettingHolder">
      <Text variant="headline4" className={style.headText}>
        Profile
      </Text>

      <Profile
        data-testid="profileSettingProfile"
        className={style.profileHolder}
        alt={user.name}
        url={user.profileUrl}
        height={50}
        width={50}
      />
      <div className={style.buttonHolder}>
        <Button
          testid="profileSettingDeleteButton"
          className={style.deleteButton}
          onClick={deleteProf}
          variant="shadow"
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          testid="profileSettingChangeButton"
          className={style.changeButton}
        >
          Change
          {
            <input
              data-testid="profileSettingFileInput"
              onChange={changeFile}
              className={style.fileInput}
              type={"file"}
            />
          }
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetting;
