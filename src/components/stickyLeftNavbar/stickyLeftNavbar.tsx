import IconCloud from "../../assets/icons/iconCloud";
import IconAllFiles from "../../assets/icons/iconAllFiles";
import IconLogo from "../../assets/icons/iconLogo";
import IconSetting from "../../assets/icons/iconSetting";
import IconStar from "../../assets/icons/iconStar";
import NavbarItem from "../stickyLeftNavbarItem/stickyLeftNavbarItem";
import style from "./stickyLeftNavbar.module.css";
import Text from "../typography/typography";
import UsageMeter from "../usageMeter/usageMeter";

const navItemsList = [
  { text: "My Cloud", Icon: IconCloud, href: "/mycloud" },
  {
    text: "All Files",
    Icon: IconAllFiles,
    href: "/allFiles",
  },
  { text: "Favorite", Icon: IconStar, href: "/fav" },
  { text: "Setting", Icon: IconSetting, href: "/setting" },
];

const StickyLeftNavbar = () => {
  return (
    <div data-testid="stickyLeftNavbar" className={style.holder}>
      <div data-testid="stickyLeftNavbarTop" className={style.top}>
        <IconLogo width="190" height="40" />
      </div>

      <div data-testid="stickyLeftNavbarMiddle" className={style.middle}>
        {navItemsList.map((item) => (
          <NavbarItem
            testId={`leftNavbarItem${item.href}`}
            key={item.text}
            {...item}
          />
        ))}
      </div>
      <div data-testid="stickyLeftBottom" className={style.bottom}>
        <UsageMeter />
      </div>
    </div>
  );
};

export default StickyLeftNavbar;
