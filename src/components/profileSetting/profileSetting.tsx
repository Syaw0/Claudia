import useFetch from "@/hooks/useFetch";
import { insertAlert } from "@/store/mycloud/mycloudStore";
import { useMycloudSelector } from "@/store/mycloud/mycloudStoreHooks";
import changeProfile, { loaderMsg } from "@/utils/changeProfile";
import deleteProfile, {
  loaderMsg as deleteLoader,
} from "@/utils/deleteProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../button/button";
import Profile from "../profile/profile";
import style from "./profileSetting.module.css";

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const [trigger, state, msg] = useFetch(
    [deleteProfile, changeProfile],
    [deleteLoader, loaderMsg]
  );

  useEffect(() => {
    dispatch(insertAlert({ type: state, msg }));
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
    <div className={style.holder}>
      <Profile
        className={style.profileHolder}
        alt={user.name}
        url={user.profileUrl}
        height={50}
        width={50}
      />
      <div className={style.buttonHolder}>
        <Button
          className={style.deleteButton}
          onClick={deleteProf}
          variant="shadow"
        >
          Delete
        </Button>
        <Button className={style.changeButton}>
          Change
          {
            <input
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
