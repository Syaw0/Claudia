import IconCloud from "../../assets/icons/iconCloud";
import IconAllFiles from "../../assets/icons/iconAllFiles";
import IconLogo from "../../assets/icons/iconLogo";
import IconSetting from "../../assets/icons/iconSetting";
import IconStar from "../../assets/icons/iconStar";
import NavbarItem from "../stickyLeftNavbarItem/stickyLeftNavbarItem";
import style from "./stickyLeftNavbar.module.css";
import UsageMeter from "../usageMeter/usageMeter";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleNavOpen } from "../../store/mycloud/mycloudStore";
import IconClose from "../../assets/icons/iconClose";
import { keyframe, timing } from "../../styles/keyframes/translate";

const navItemsList = [
  { text: "My Cloud", Icon: IconCloud, href: "/mycloud" },
  // {
  //   text: "All Files",
  //   Icon: IconAllFiles,
  //   href: "/allFiles",
  // },
  // { text: "Favorite", Icon: IconStar, href: "/fav" },
  { text: "Setting", Icon: IconSetting, href: "/setting" },
];

const StickyLeftNavbar = () => {
  const ref: any = useRef(null);
  const dispatch = useDispatch();
  const closeNav = () => {
    const current = ref.current as HTMLElement;
    current.animate(keyframe, timing);
    setTimeout(() => {
      dispatch(toggleNavOpen(false));
    }, 1000);
  };
  return (
    <div ref={ref} data-testid="stickyLeftNavbar" className={style.holder}>
      <div data-testid="stickyLeftNavbarTop" className={style.top}>
        <IconLogo width="190" height="40" />
        <div onClick={closeNav} className={style.close}>
          <IconClose width="24" height="24" />
        </div>
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
