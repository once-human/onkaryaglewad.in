import localFont from "next/font/local";

const mainFont = localFont({
  src: "../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
  variable: "--font-inter"
});

export default mainFont;