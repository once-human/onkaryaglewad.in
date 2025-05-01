import ItemCards from "@/components/ItemCards";
import SectionTitle from "@/components/SectionTitle";
import textData from "@/constants/textData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
  description:
    textData?.educationPageData?.subtitle ??
    "Details about Onkar Yaglewad's academic background and qualifications.",
  openGraph: {
    title: "Education | Onkar Yaglewad",
    description:
      textData?.educationPageData?.subtitle ??
      "Details about Onkar Yaglewad's academic background.",
  },
  twitter: {
    title: "Education | Onkar Yaglewad",
    description:
      textData?.educationPageData?.subtitle ??
      "Details about Onkar Yaglewad's academic background.",
  },
};

export default function Education() {
  return (
    <div>
      <section key="Academic">
        <SectionTitle
          title="Academic Education"
          subTitle={textData.educationPageData.subtitle}
        />
        <ItemCards.iconCard
          listItems={textData.educationPageData.academic}
          page="Education"
        />
      </section>
    </div>
  );
}
