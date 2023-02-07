import "@/styles/globals.css";
import { Playfair_Display, Lato } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import style from "../styles/themeToken.module.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  variable: "--font-head",
  preload: false,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
  style: ["italic", "normal"],
  variable: "--font-sub",
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${lato.variable} ${playfair.variable} ${style.color_light} ${style.transitionToken} ${style.shadows} ${style.font_sizes} ${style.line_height} rootHolder`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
