import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ItemCards from "@/components/ItemCards";
import SectionTitle from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimeLine";
import textData from "@/constants/textData";

// Dynamically import SkillsGraph using relative path
const SkillsGraph = dynamic(() => import('../../components/SkillsGraph'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full flex items-center justify-center text-foreground/50">Loading Graph...</div>,
});

export const metadata: Metadata = {
  title: 'About - Onkar Yaglewad',
  description: 'Learn more about Onkar Yaglewad, a B.Tech CSE student passionate about web development, systems, and FOSS.',
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Section Title - Manual Styling */} 
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">About Me</h1>
        <p className="text-foreground/80">Get to know me a little better.</p>
      </div>

      {/* Main Content Grid */} 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Introduction Text */} 
        <div> 
          <div className="text-justify space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Hey, I'm Onkar Yaglewad.
            </p>
            <p>
              I started coding when I was 12, figuring out how to turn my sister's Android app project into a working tourism website. It was clunky, confusing, and full of trial and error but that messy process is what made me fall in love with tech.
            </p>
            <p>
              Over the years, I've built things like a social platform that reached over 3K active users. I've also scrapped projects that never made it past a few commits. Both experiences taught me in different ways.
            </p>
            <p>
              I use Arch Linux as my daily driver, not for the badge, but because I enjoy understanding what's under the hood and fixing things when they go wrong. That mindset extends to how I approach code, systems, and life in general.
            </p>
            <p>
              Lately, I've been diving deeper into FOSS, exploring the structures that shape the digital world and the ways we can make them better. I'm always up for building, collaborating, and figuring things out along the way.
            </p>
            <p>
              Right now, I'm working on VIA - a subscription-based ride-sharing app. Can't share too much publicly yet, but if it sounds interesting and you think you can help us out in any way, feel free to reach out. Maybe we'll end up building something crazy together.
            </p>
            <p>
              I love building things. If you've got an idea, want a second brain, or just need someone to bounce thoughts off, just hit me up, as long as it's not spam, I'll always reply :p
            </p>
          </div>
        </div>

        {/* Right Column: Skills Graph */} 
        <div className="h-[400px] md:min-h-[450px]"> {/* Maintain height for graph */} 
          <SkillsGraph />
        </div>
      </div>

      {/* Placeholder for other sections if they exist */} 
      {/* <div className="mt-16 md:mt-24"> ... Timeline ... </div> */}
      {/* <div className="mt-16 md:mt-24"> ... ItemCards ... </div> */}

    </div>
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

export default AboutPage;
