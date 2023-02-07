import { ImageLoaderProps } from "next/image";

const loader = ({ src, quality, width }: ImageLoaderProps) => {
  // when i develop server i use this line
  // return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`;
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default loader;
