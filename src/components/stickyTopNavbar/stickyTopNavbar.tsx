import IconMenu from "../../assets/icons/iconMenu";
import { toggleNavOpen } from "../../store/mycloud/mycloudStore";
import { useDispatch } from "react-redux";
import IconAdd from "../../assets/icons/iconAdd";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import Button from "../button/button";
import Profile from "../profile/profile";
import Text from "../typography/typography";
import style from "./stickyTopNavbar.module.css";

const StickyTopNavbar = () => {
  const dispatch = useDispatch();
  const profileData = useMycloudSelector((s) => s.user);
  const handleOpenNav = () => {
    dispatch(toggleNavOpen(true));
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
          <input multiple type={"file"} className={style.uploadInput} />
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
