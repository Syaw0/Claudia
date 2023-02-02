import Link from "next/link";
import { useEffect, useState } from "react";
import Text from "../typography/typography";
import style from "./stickyLeftNavbarItem.module.css";

interface NavbarItemPropsType {
  text: string;
  Icon: (params: IconTypes) => JSX.Element;
  href: string;
  testId: string;
}

const NavbarItem = ({ text, Icon, href, testId }: NavbarItemPropsType) => {
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);
  return (
    <div data-testid={testId} className={style.holder}>
      <Link
        data-testid="navbarItemAnchor"
        href={href}
        className={
          activeLink === href ? style.activeLinkHolder : style.linkHolder
        }
      >
        <Icon className={style.icon} width="24" height="24" />
        <Text
          testid="navbarItemText"
          variant="headline6"
          className={style.text}
        >
          {text}
        </Text>
      </Link>
    </div>
  );
};

export default NavbarItem;
