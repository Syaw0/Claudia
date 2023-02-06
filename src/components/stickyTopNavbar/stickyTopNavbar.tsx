import IconMenu from "../../assets/icons/iconMenu";
import { insertAlert, toggleNavOpen } from "../../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";
import IconAdd from "../../assets/icons/iconAdd";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import Button from "../button/button";
import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./stickyTopNavbar.module.css";
import { ChangeEvent, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import upload, { loaderMsg } from "@/utils/upload";
import checkFilesBeforeUpload from "@/utils/checkFilesBeforeUpload";

const StickyTopNavbar = () => {
  const [trigger, state, msg, setMsg] = useFetch([upload], [loaderMsg]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(insertAlert({ type: state, msg }));
  }, [state, msg, dispatch]);
  const cwd = useMycloudSelector((s) => s.cwd);
  const usageData = useMycloudSelector((s) => s.storageUsage);
  const profileData = useMycloudSelector((s) => s.user);
  const handleOpenNav = () => {
    dispatch(toggleNavOpen(true));
  };

  const fileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.currentTarget;
    const files = fileInput.files;
    const checkResult = checkFilesBeforeUpload(files, usageData);
    if (!checkResult.status) {
      return dispatch(insertAlert({ type: "error", msg: checkResult.msg }));
    }
    const res = await trigger(0, files, cwd);
    // TODO if upload was successful we must update list !
  };

  return (
    <div data-testid="stickyTopNavbarHolder" className={style.holder}>
      <div className={style.left}>
        <IconMenu
          onClick={handleOpenNav}
          className={style.menuIcon}
          width="24"
          height="24"
        />

        <Button
          testid="stickyTopNavbarButton"
          className={style.fileUploadButton}
          variant="shadow"
          StartIcon={IconAdd}
        >
          <Text>Upload File</Text>
          <input
            onChange={fileInputChange}
            multiple
            type={"file"}
            className={style.uploadInput}
          />
        </Button>
      </div>

      <Profile
        data-testid="stickyTopNavbarProfile"
        className={style.profile}
        alt={profileData.name}
        url={profileData.profileUrl}
        height={50}
        width={50}
      />
    </div>
  );
};

export default StickyTopNavbar;
