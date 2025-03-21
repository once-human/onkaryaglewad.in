import ItemCards from "@/components/ItemCards";
import textData from "@/constants/textData";
import SectionTitle from "@/components/SectionTitle";

export default function Projects() {
  return (
    <div>
      <section key="Projects">
        <SectionTitle
          title="Projects"
          subTitle="Check out some of the projects I've worked on."
        />
        <ItemCards.iconCard
          listItems={textData.experiencePageData.projects}
          page="Projects"
        />
      </section>
    </div>
  );
}
