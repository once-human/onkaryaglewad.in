import ItemCards from "@/components/ItemCards";
import textData from "@/constants/textData";
import SectionTitle from "@/components/SectionTitle";

export default function Highlights() {
  return (
    <div>
      <section key="Event Highlights">
        <SectionTitle
          title={textData.mediaPageData.title.events}
          subTitle={textData.mediaPageData.subtitle.events}
        />
        <ItemCards.eventsCard listItems={textData.mediaPageData.eventsList} />
      </section>
    </div>
  );
} 