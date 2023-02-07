import Text from "../../../components/typography/typography";
import { ReactNode, useState } from "react";
import style from "./layout.module.css";

interface LayoutMultipleSectionItems {
  sectionName: string;
  component: ReactNode;
}

interface LayoutMultipleSection {
  layoutData: LayoutMultipleSectionItems[];
  topNavExtraComponent?: ReactNode;
  className?: string;
}

const Layout = ({
  layoutData,
  topNavExtraComponent = <div></div>,
  className = "",
}: LayoutMultipleSection) => {
  const [activeSection, setActiveSection] = useState(layoutData[0]);
  const changeSection = (e: number) => {
    if (layoutData[e].sectionName !== activeSection.sectionName) {
      setActiveSection(layoutData[e]);
    }
  };
  return (
    <div
      data-testid="layoutMultipleHolder"
      className={`${style.holder} ${className}`}
    >
      <div data-testid="layoutMultipleTop" className={style.top}>
        <div className={style.topLeft}>
          {layoutData.map((f, i) => {
            return (
              <Text
                testid={f.sectionName}
                onClick={() => {
                  changeSection(i);
                }}
                className={`${style.sectionKey} ${
                  f.sectionName == activeSection.sectionName
                    ? style.activeSection
                    : ""
                }`}
                key={f.sectionName}
              >
                {f.sectionName}
              </Text>
            );
          })}
        </div>
        <div className={style.topRight}>{topNavExtraComponent}</div>
      </div>
      <div data-testid="layoutMultipleBottom" className={style.bottom}>
        {activeSection.component}
      </div>
    </div>
  );
};

export default Layout;
