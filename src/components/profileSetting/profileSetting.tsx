import useFetch from "../../hooks/useFetch";
import { insertAlert } from "../../store/mycloud/mycloudStore";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import changeProfile, { loaderMsg } from "../../utils/changeProfile";
import deleteProfile, {
  loaderMsg as deleteLoader,
} from "../../utils/deleteProfile";
import { ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../button/button";
import Profile from "../profile/profile";
import style from "./profileSetting.module.css";
import Text from "../typography/typography";
import checkImageForProfile from "../../utils/checkImageForProfile";
import { useRouter } from "next/router";

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useMycloudSelector((s) => s.user);

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
    if (userData.profileUrl !== "/prof/default.png") {
      const res = await trigger(0, userData.id);
      if (res.status) {
        router.reload();
      }
    }
  };
  const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0) as File;
    const checkImageResult = checkImageForProfile(file);
    if (!checkImageResult.status) {
      return dispatch(
        insertAlert({ type: "error", msg: checkImageResult.msg })
      );
    }
    const res = await trigger(1, file, userData.id, userData.profileUrl);
    if (res.status) {
      router.reload();
    }
  };
  return (
    <div className={style.holder} data-testid="profileSettingHolder">
      <Text variant="headline4" className={style.headText}>
        Profile
      </Text>

      <Profile
        data-testid="profileSettingProfile"
        className={style.profileHolder}
        alt={userData.name}
        url={userData.profileUrl}
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
              accept="image/*"
              type={"file"}
            />
          }
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetting;
