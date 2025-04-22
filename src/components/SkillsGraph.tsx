"use client";

import React, { useEffect, useState, useRef } from 'react';
// Dynamically import ForceGraph2D to ensure it only runs on the client-side
import ForceGraph2D from 'react-force-graph-2d';

// Define Node and Link types (adjust as needed)
interface NodeObject {
  id: string;
  name: string;
  val?: number; // Optional: for node size
  color?: string;
}

interface LinkObject {
  source: string;
  target: string;
  color?: string;
}

// Define the graph data based on the intro text analysis
const graphData = {
  nodes: [
    { id: "coding", name: "Coding", val: 10, color: '#6366f1' },
    { id: "webdev", name: "Web Dev", val: 8, color: '#818cf8' },
    { id: "problemsolving", name: "Problem Solving", val: 8, color: '#a78bfa' },
    { id: "arch", name: "Arch Linux", val: 6, color: '#c4b5fd' },
    { id: "systems", name: "Systems Thinking", val: 8, color: '#a78bfa' },
    { id: "foss", name: "FOSS", val: 9, color: '#818cf8' },
    { id: "building", name: "Building Projects", val: 10, color: '#6366f1' },
    { id: "collaboration", name: "Collaboration", val: 7, color: '#a78bfa' },
    { id: "via", name: "VIA App", val: 5, color: '#c4b5fd' },
    { id: "learning", name: "Learning", val: 9, color: '#818cf8' }
  ] as NodeObject[],
  links: [
    { source: "coding", target: "webdev", color: '#4f46e5' },
    { source: "webdev", target: "building", color: '#4f46e5' },
    { source: "building", target: "via", color: '#a78bfa' },
    { source: "coding", target: "learning", color: '#4f46e5' },
    { source: "learning", target: "building", color: '#6366f1' },
    { source: "arch", target: "systems", color: '#6366f1' },
    { source: "arch", target: "problemsolving", color: '#6366f1' },
    { source: "systems", target: "problemsolving", color: '#a78bfa' },
    { source: "systems", target: "foss", color: '#818cf8' },
    { source: "foss", target: "building", color: '#818cf8' },
    { source: "foss", target: "collaboration", color: '#818cf8' },
    { source: "building", target: "collaboration", color: '#a78bfa' }
  ] as LinkObject[]
};

const SkillsGraph: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Ensure component only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Adjust graph dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    // Set initial dimensions
    updateDimensions(); 

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isClient]); // Re-run if isClient changes (initial mount)

  if (!isClient) {
    return null; // Or a loading placeholder
  }

  return (
    <div ref={containerRef} className="w-full h-64 md:h-full border border-border/20 rounded-lg overflow-hidden bg-background/30">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name" // Show node name on hover
          nodeVal="val"    // Use 'val' for node size
          nodeColor="color" // Use 'color' defined in node data
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name || '';
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);

            // Draw background rectangle for label
            ctx.fillStyle = 'rgba(40, 40, 40, 0.7)'; // Dark semi-transparent background
            ctx.fillRect((node.x ?? 0) - bckgDimensions[0] / 2, (node.y ?? 0) - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);

             // Draw node circle (using data color)
            ctx.beginPath();
            const radius = Math.sqrt(Math.max(0, node.val || 1)) * 2.5; // Scale size based on val
            ctx.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || 'rgba(100, 100, 255, 0.8)'; // Use node color or default
            ctx.fill();

            // Draw label text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#E0E0E0'; // Light gray text
            ctx.fillText(label, node.x ?? 0, node.y ?? 0);

            node.__bckgDimensions = bckgDimensions; // Cache dimensions for selection
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            const bckgDimensions = node.__bckgDimensions;
            if (!bckgDimensions) return;
            ctx.fillStyle = color;
            ctx.fillRect((node.x ?? 0) - bckgDimensions[0] / 2, (node.y ?? 0) - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
          }}
          linkColor="color" // Use 'color' defined in link data
          linkWidth={1}
          linkDirectionalParticles={1} // Add subtle particle animation to links
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.006}
          // Basic graph physics tuning
          dagMode={undefined} // Not a directed acyclic graph
          cooldownTicks={100}
           warmupTicks={50}
        />
      )}
    </div>
  );
};

export default SkillsGraph; 