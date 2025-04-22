import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ItemCards from "@/components/ItemCards";
import SectionTitle from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimeLine";
import textData from "@/constants/textData";

// Dynamically import SkillsGraph using relative path
const SkillsGraph = dynamic(() => import('../../components/SkillsGraph'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center text-foreground/50">Loading Graph...</div>,
});

export const metadata: Metadata = {
  title: 'About - Onkar Yaglewad',
  description: 'Learn more about Onkar Yaglewad, a B.Tech CSE student passionate about web development, systems, and FOSS.',
};

const Acquainted = () => {
  return (
    <section id="acquainted">
      <SectionTitle
        title="About Me"
        subTitle="Get to know me a little better."
      />
      <div className="mt-8 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="w-full md:w-[70%] text-foreground/80 order-1 md:order-none">
          <div className="text-justify space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Hey, I&apos;m Onkar Yaglewad.
            </p>
            <p>
              I started coding when I was 12, figuring out how to turn my sister&apos;s Android app project into a working tourism website. It was clunky, confusing, and full of trial and error but that messy process is what made me fall in love with tech.
            </p>
            <p>
              Over the years, I&apos;ve built things like a social platform that reached over 3K active users. I&apos;ve also scrapped projects that never made it past a few commits. Both experiences taught me in different ways.
            </p>
            <p>
              I use Arch Linux as my daily driver, not for the badge, but because I enjoy understanding what&apos;s under the hood and fixing things when they go wrong. That mindset extends to how I approach code, systems, and life in general.
            </p>
            <p>
              Lately, I&apos;ve been diving deeper into FOSS, exploring the structures that shape the digital world and the ways we can make them better. I&apos;m always up for building, collaborating, and figuring things out along the way.
            </p>
            <p>
              Right now, I&apos;m working on VIA - a subscription-based ride-sharing app. Can&apos;t share too much publicly yet, but if it sounds interesting and you think you can help us out in any way, feel free to reach out. Maybe we&apos;ll end up building something crazy together.
            </p>
            <p>
              I love building things. If you&apos;ve got an idea, want a second brain, or just need someone to bounce thoughts off, just hit me up, as long as it&apos;s not spam, I&apos;ll always reply :p
            </p>
          </div>
        </div>
        <div className="w-full md:w-[30%] h-[500px] order-none md:order-1">
          <SkillsGraph />
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
        {textData.aboutPageData.achievementsList?.map((achievement, index) => (
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
      {textData.aboutPageData.testimonials && (
        <ItemCards.testimonialCard
          listItems={textData.aboutPageData.testimonials}
        />
      )}
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
