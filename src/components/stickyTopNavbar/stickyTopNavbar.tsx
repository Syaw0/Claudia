import IconAdd from "../../assets/icons/iconAdd";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import Button from "../button/button";
import Profile from "../profile/profile";
import style from "./stickyTopNavbar.module.css";

const StickyTopNavbar = () => {
  const profileData = useMycloudSelector((s) => s.user);

  return (
    <div data-testid="stickyTopNavbarHolder" className={style.holder}>
      <Button
        testid="stickyTopNavbarButton"
        className={style.fileUploadButton}
        variant="shadow"
        StartIcon={IconAdd}
      >
        Upload File
      </Button>

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
