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
import Script from "next/script";

const metadata: Metadata = {
  metadataBase: new URL("https://onkaryaglewad.in"), // Replace with your actual domain
  title: {
    default: "Onkar Yaglewad - Software Developer | Portfolio",
    template: "%s | Onkar Yaglewad",
  },
  description:
    "Explore the portfolio of Onkar Yaglewad, a passionate software developer showcasing projects in web development, system design, and FOSS contributions.",
  keywords: [
    "Onkar Yaglewad",
    "Software Developer",
    "Portfolio",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Arch Linux",
    "FOSS",
    "Pune",
    "India",
  ],
  openGraph: {
    title: "Onkar Yaglewad - Software Developer | Portfolio",
    description:
      "Explore the portfolio of Onkar Yaglewad, a passionate software developer.",
    url: "https://onkaryaglewad.in", // Replace with your actual domain
    siteName: "Onkar Yaglewad Portfolio",
    // images: [ // Add a default image URL later if you have one
    //   {
    //     url: '/og-image.png',
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onkar Yaglewad - Software Developer | Portfolio",
    description:
      "Explore the portfolio of Onkar Yaglewad, a passionate software developer.",
    // images: ['/twitter-image.png'], // Add a Twitter-specific image URL later
    // creator: "@yourTwitterHandle", // Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: { // Add verification tags if needed
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
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
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-T48Q2MLFSR"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T48Q2MLFSR');
          `}
        </Script>
        {/* GoatCounter Script */}
        <Script
          strategy="afterInteractive"
          data-goatcounter="https://oncehuman.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
        />
        {/* Microsoft Clarity Script */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rcl8ootfam");
          `}
        </Script>
        {/* Umami Analytics Script */}
        <Script 
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b4fe4506-cf0f-4d37-8d08-284bfb02993f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
