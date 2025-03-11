import localFont from "next/font/local";

const mainFont = localFont({
  src: [
    {
      path: "../app/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["system-ui", "arial"],
  variable: "--font-inter"
});

export default mainFont;