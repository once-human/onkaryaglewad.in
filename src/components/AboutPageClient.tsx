"use client";

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { NodeObject as FGNodeObject } from 'react-force-graph-2d';
import SectionTitle from "@/components/SectionTitle";
import textData from "@/constants/textData";

// Define the type for the node data we expect in the callback
interface HoveredNodeData {
  id?: string | number;
  name?: string;
  val?: number;
  textSegmentId?: string;
}

// Dynamically import SkillsGraph
const SkillsGraph = dynamic(() => import('./SkillsGraph'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center text-foreground/50">Loading Graph...</div>,
});

// Explicitly type the return value as JSX.Element
const AcquaintedSection = (): JSX.Element => {
  const [hoveredTextSegmentId, setHoveredTextSegmentId] = useState<string | null>(null);

  const handleNodeHover = useCallback((node: FGNodeObject<HoveredNodeData> | null) => {
    const segmentId = node?.textSegmentId ?? null;
    console.log(`[AcquaintedSection] Hover callback: node ID = ${node?.id}, segment ID = ${segmentId}`);
    setHoveredTextSegmentId(segmentId);
  }, []);

  return (
    <section id="acquainted">
      <SectionTitle
        title="About Me"
        subTitle={textData.aboutPageData.subtitle.acquainted}
      />
      <div className="mt-8 flex flex-col md:flex-row md:justify-center md:items-center gap-8 md:gap-x-12 lg:gap-x-16 md:px-6 lg:px-10 xl:px-14">
        <div className="w-full md:w-[50%]">
          <div className="text-justify space-y-4 text-foreground/90 leading-relaxed">
            {textData.aboutPageData.introductionSegments?.map((segment) => {
              const isHovered = segment.id === hoveredTextSegmentId;
              const isAnyHovered = hoveredTextSegmentId !== null;

              return (
                <p
                  key={segment.id}
                  className={`
                    transition-opacity duration-300 ease-in-out
                    ${isHovered
                      ? 'opacity-100'
                      : isAnyHovered
                        ? 'opacity-40'
                        : 'opacity-100'
                    }
                  `}
                >
                  {segment.text}
                </p>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-[30%] h-[500px] order-none md:order-1">
          <SkillsGraph onNodeHoverCallback={handleNodeHover} />
        </div>
      </div>
    </section>
  );
};

export default AcquaintedSection; 