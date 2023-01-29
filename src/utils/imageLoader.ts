import { ImageLoaderProps } from "next/image";

const loader = ({ src, quality, width }: ImageLoaderProps) => {
  return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`;
};

export default loader;
