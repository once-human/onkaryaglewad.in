import { Inter } from "next/font/google";

const mainFont = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
  variable: "--font-inter"
});

export default mainFont;