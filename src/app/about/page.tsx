// REMOVE "use client"; directive

import { Metadata } from 'next';
import ItemCards from "@/components/ItemCards";
import SectionTitle from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimeLine";
import textData from "@/constants/textData";

// Import the new client component using default import syntax
import AcquaintedSection from '@/components/AboutPageClient';

export const metadata: Metadata = {
  title: 'About - Onkar Yaglewad',
  description: 'Learn more about Onkar Yaglewad, a B.Tech CSE student passionate about web development, systems, and FOSS.',
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
      <AcquaintedSection />
      <hr className="my-12 gradientDivider" />
      <Achievements />
      <hr className="my-12 gradientDivider" />
      <Recommendations />
    </div>
  );
}
