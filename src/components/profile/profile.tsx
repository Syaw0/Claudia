import loader from "../../utils/imageLoader";
import Image from "next/image";
import style from "./profile.module.css";

interface ProfileType {
  url: string;
  height: number;
  width: number;
  alt: string;
  onClick?: () => void;
  "data-testid"?: string;
  className?: string;
}

const Profile = ({
  url,
  width,
  height,
  alt,
  className = "",
  ...params
}: ProfileType) => {
  return (
    <div {...params} className={`${style.holder} ${className}`}>
      <Image
        loader={loader}
        src={`${url}`}
        quality={50}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  );
};

export default Profile;
