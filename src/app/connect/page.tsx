import ItemCards from "@/components/ItemCards";
import textData from "@/constants/textData";
import SectionTitle from "@/components/SectionTitle";
import { Metadata } from "next";
import { ContactForm } from "@/components/ConnectPageClient";

export const metadata: Metadata = {
  title: "Connect",
  description:
    textData?.connectPageData?.description ??
    "Get in touch with Onkar Yaglewad through various channels or send a direct message.",
  openGraph: {
    title: "Connect with Onkar Yaglewad",
    description:
      textData?.connectPageData?.description ?? "Contact Onkar Yaglewad.",
  },
  twitter: {
    title: "Connect with Onkar Yaglewad",
    description:
      textData?.connectPageData?.description ?? "Contact Onkar Yaglewad.",
  },
};

export default function ConnectPage() {
  return (
    <div>
      <section key="Connect">
        <SectionTitle
          title={textData.connectPageData.title}
          subTitle={textData.connectPageData.subtitle}
        />
        <div className="mt-16 flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xs:gap-8 sm:gap-8 md:gap-16 lg:gap-24">
          <ContactForm />
          <ItemCards.connectChannelCard
            listItems={textData.connectPageData.connectLinks}
          />
        </div>
      </section>
    </div>
  );
}
