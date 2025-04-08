import ItemCards from "@/components/ItemCards";
import textData from "@/constants/textData";
import SectionTitle from "@/components/SectionTitle";
import { MediaPageData } from "@/types/interfaces";

export default function Media() {
  return (
    <div className="space-y-8">
      <ItemCards.bannerCard imageSrc="/profile.webp" />

      <div className="space-y-8">
        <section key="Event Highlights">
          <SectionTitle
            title={textData.mediaPageData.title.events}
            subTitle={textData.mediaPageData.subtitle.events}
          />
          <ItemCards.eventsCard listItems={textData.mediaPageData.eventsList} />
        </section>
        {/* <section key="Log">
          <SectionTitle
            title="Log"
            subTitle="A collection of my media appearances and mentions."
          />
          <ItemCards.bannerCard imageSrc="/banner.webp" />
          <ItemCards.iconCard
            listItems={textData.mediaPageData.log}
            page="Media"
          />
        </section> */}
      </div>
    </div>
  );
}
