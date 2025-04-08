import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavBar from "@/components/NavBar";
import mainFont from "@/constants/fontStyle";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { Metadata } from "next";
import metadataJSON from "@/config/metaData";
import { TerminalProvider } from "@/context/TerminalContext";
import TerminalView from "@/components/TerminalView";

export const metadata: Metadata = metadataJSON;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mainFont.className} bodyTheme`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TerminalProvider>
            <div className="relative flex flex-col min-h-screen">
              <NavBar />
              <main className="py-6 pb-5 md:pb-10 mt-20 md:mt-24 xs:mx-6 sm:mx-12 md:mx-16 flex-grow">
                {children}
              </main>
              <ThemeSwitcher />
              <Footer />
            </div>
            <TerminalView />
            <Analytics />
            <SpeedInsights />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
