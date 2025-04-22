import ItemCards from "@/components/ItemCards";
import SectionTitle from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimeLine";
import textData from "@/constants/textData";
import SkillsGraph from "@/components/SkillsGraph";

const Acquainted = () => {
  // Store the specific text provided by the user, removing the leading "AboutAbout\n\n"
  const introText = `Hey, I'm Onkar Yaglewad.

I started coding when I was 12, figuring out how to turn my sister's Android app project into a working tourism website. It was clunky, confusing, and full of trial and error but that messy process is what made me fall in love with tech.

Over the years, I've built things like a social platform that reached over 3K active users. I've also scrapped projects that never made it past a few commits. Both experiences taught me in different ways.

I use Arch Linux as my daily driver, not for the badge, but because I enjoy understanding what's under the hood and fixing things when they go wrong. That mindset extends to how I approach code, systems, and life in general.

Lately, I've been diving deeper into FOSS, exploring the structures that shape the digital world and the ways we can make them better. I'm always up for building, collaborating, and figuring things out along the way.

Right now, I'm working on VIA - a subscription-based ride-sharing app. Can't share too much publicly yet, but if it sounds interesting and you think you can help us out in any way, feel free to reach out. Maybe we'll end up building something crazy together.

I love building things. If you've got an idea, want a second brain, or just need someone to bounce thoughts off, just hit me up, as long as it's not spam, I'll always reply :p`;

  return (
    <section id="acquainted">
      <SectionTitle
        title="About Me"
        subTitle="Get to know me a little better."
      />
      {/* Two-column layout: Intro Text (Left 70%) + Graph (Right 30%) */}
      <div className="mt-8 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        
        {/* Left Column (Intro Text - 70% on md+) */}
        <div className="w-full md:w-[70%] text-foreground/80 order-1 md:order-none">
          {/* Render the introduction text split into paragraphs, justified, with name highlighted */}
          {introText.split('\n\n').map((paragraph, index) => {
            const trimmedParagraph = paragraph.trim();
            if (!trimmedParagraph) return null;

            if (index === 0) {
              // Special handling for the first paragraph to highlight the name
              const name = "Onkar Yaglewad";
              const parts = trimmedParagraph.split(name);
              return (
                <p key={index} className="mb-4 text-justify leading-relaxed">
                  {parts[0]}
                  <span className="font-semibold text-foreground">{name}</span>
                  {parts[1]}
                </p>
              );
            } else {
              // Render other paragraphs normally
              return (
                <p key={index} className="mb-4 text-justify leading-relaxed">{trimmedParagraph}</p> // Use text-justify
              );
            }
          })}
        </div>

        {/* Right Column (Graph - 30% on md+) */}
        {/* Restore fixed height */} 
        <div className="w-full md:w-[30%] h-96 md:h-[600px] order-none md:order-1"> {/* Restore fixed height */}
          <SkillsGraph />
        </div>

      </div>

      {/* Detail Cards Section (Below Graph/Intro) */}
      <div className="mt-16">
         <SectionTitle title="Details" subTitle="Background, goals, and interests." />
         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Background, Goals, Interests cards remain here */}
           <ItemCards.tileCard
            title="Background"
            description={textData.aboutPageData.itemCardDescription.background}
            listItems={textData.aboutPageData.itemCardList.backgroundList}
          />
          <ItemCards.tileCard
            title="Goals"
            description={textData.aboutPageData.itemCardDescription.goals}
            listItems={textData.aboutPageData.itemCardList.goalsList}
          />
          <ItemCards.tileCard
            title="Interests"
            description={textData.aboutPageData.itemCardDescription.interests}
            listItems={textData.aboutPageData.itemCardList.interestsList}
          />
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  return (
    <section id="achievements">
      <SectionTitle
        title={textData.aboutPageData.title.achievements}
        subTitle={textData.aboutPageData.subtitle.achievements}
      />
      <div className="w-full max-w-3xl mx-auto py-6 md:py-12">
        {textData.aboutPageData.achievementsList.map((achievement, index) => (
          <TimelineItem
            key={index}
            title={achievement.title}
            date={achievement.date}
            description={achievement.description}
          />
        ))}
      </div>
    </section>
  );
};

const Recommendations = () => {
  return (
    <section id="recommendations">
      <SectionTitle
        title={textData.aboutPageData.title.testimonials}
        subTitle={textData.aboutPageData.subtitle.testimonials}
      />
      <ItemCards.testimonialCard
        listItems={textData.aboutPageData.testimonials}
      />
    </section>
  );
};

export default function About() {
  return (
    <div>
      <Acquainted />
      <hr className="my-12 gradientDivider" />
      <Achievements />
      <hr className="my-12 gradientDivider" />
      <Recommendations />
    </div>
  );
}
