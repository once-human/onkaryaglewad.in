"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
// Statically import, relying on parent dynamic import for SSR control
import ForceGraph2D, { ForceGraphProps, NodeObject as FGNodeObject, LinkObject as FGLinkObject } from 'react-force-graph-2d';

// Define simpler types, inferring more from the library
// Ensure ID is consistently treated as string for lookup
interface NodeData { name: string; val?: number; }
interface LinkData {}

// Restore actual graph data derived from intro text
const graphData = {
  nodes: [
    { id: "coding", name: "Coding", val: 10 },
    { id: "webdev", name: "Web Dev", val: 8 },
    { id: "problemsolving", name: "Problem Solving", val: 8 },
    { id: "arch", name: "Arch Linux", val: 6 },
    { id: "systems", name: "Systems Thinking", val: 8 },
    { id: "foss", name: "FOSS", val: 9 },
    { id: "building", name: "Building Projects", val: 10 },
    { id: "collaboration", name: "Collaboration", val: 7 },
    { id: "via", name: "VIA App", val: 5 },
    { id: "learning", name: "Learning", val: 9 }
  ],
  links: [
    { source: "coding", target: "webdev" },
    { source: "webdev", target: "building" },
    { source: "building", target: "via" },
    { source: "coding", target: "learning" },
    { source: "learning", target: "building" },
    { source: "arch", target: "systems" },
    { source: "arch", target: "problemsolving" },
    { source: "systems", target: "problemsolving" },
    { source: "systems", target: "foss" },
    { source: "foss", target: "building" },
    { source: "foss", target: "collaboration" },
    { source: "building", target: "collaboration" }
  ]
};

// Colors and Constants - Simplified for Corrected Logic
const OBSIDIAN_BG = '#202023';
const NODE_DEFAULT_COLOR = '#E0E0E0'; // Light Gray/Off-white (Default state, or Dimmed state)
const NODE_HOVER_COLOR = '#a855f7'; // Purple (For hovered node and neighbors)
const NODE_BORDER_COLOR = '#B0B0B0'; 
const LINK_DEFAULT_COLOR_RGB: [number, number, number] = [200, 200, 200]; // Light Gray links (Default or Dimmed)
const LINK_HOVER_COLOR_RGB: [number, number, number] = [168, 85, 247]; // Purple links (For hover group)
const TEXT_COLOR = '#FFFFFF'; 
const DIMMED_OPACITY = 0.2; // More pronounced dimming for non-highlighted
const BASE_NODE_RADIUS_SCALE = 1.3; 
const HOVER_NODE_RADIUS_SCALE = 1.5; // Only for the directly hovered node
const NODE_HOVER_AREA_RADIUS_MULTIPLIER = 1.8; 
const BASE_LINK_WIDTH = 0.2; 
const HOVER_LINK_WIDTH = 0.9; 
const ANIMATION_LERP_FACTOR = 0.1; 

// Helper to parse hex color - Explicit Tuple Return Type
function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [255, 255, 255]; // Default white
}

// Animation State Types with Color RGB
interface NodeAnimState { opacity: number; colorRGB: [number, number, number]; radiusScale: number; }
interface LinkAnimState { opacity: number; colorRGB: [number, number, number]; width: number; }

const SkillsGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<FGLinkObject<NodeData, LinkData>>>(new Set());
  const [hoverNode, setHoverNode] = useState<FGNodeObject<NodeData> | null>(null);

  const nodeAnimationState = useRef<Map<string, NodeAnimState>>(new Map());
  const linkAnimationState = useRef<Map<FGLinkObject<NodeData, LinkData>, LinkAnimState>>(new Map());

  // Dimension effect (unchanged)
  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    let frameId = requestAnimationFrame(updateDimensions);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []); 

  // Highlight calculation effect
  useEffect(() => {
    console.log("[Highlight Effect] Hover node changed:", hoverNode?.id);
    const newHighlightNodes = new Set<string>();
    const newHighlightLinks = new Set<FGLinkObject<NodeData, LinkData>>();
    if (hoverNode) {
      const hoverNodeId = hoverNode.id as string;
      newHighlightNodes.add(hoverNodeId);
      graphData.links.forEach(link => {
        const sourceId = typeof link.source === 'object' && link.source !== null ? (link.source as FGNodeObject<NodeData>).id : link.source as string | number | undefined;
        const targetId = typeof link.target === 'object' && link.target !== null ? (link.target as FGNodeObject<NodeData>).id : link.target as string | number | undefined;
        if (sourceId === hoverNodeId || targetId === hoverNodeId) {
          newHighlightLinks.add(link);
          newHighlightNodes.add(sourceId as string);
          newHighlightNodes.add(targetId as string);
        }
      });
    }
    console.log("[Highlight Effect] Calculated Highlight Nodes:", newHighlightNodes);
    console.log("[Highlight Effect] Calculated Highlight Links:", newHighlightLinks.size); // Log size, not objects
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);
  }, [hoverNode]);

  // Interpolation functions
  const lerp = useCallback((current: number, target: number, factor: number): number => {
    return current + (target - current) * factor;
  }, []); 

  const lerpRGB = useCallback((current: [number, number, number], target: [number, number, number], factor: number): [number, number, number] => {
    return [
        lerp(current[0], target[0], factor),
        lerp(current[1], target[1], factor),
        lerp(current[2], target[2], factor)
    ];
  }, [lerp]); // Depends on lerp

  // Engine tick effect for animation updates - CORRECTED LOGIC
  const handleEngineTick = useCallback(() => {
    let changed = false;
    const targetNodeStates = new Map<string, NodeAnimState>();
    const targetLinkStates = new Map<FGLinkObject<NodeData, LinkData>, LinkAnimState>();
    const isAnythingHovered = !!hoverNode; // Simpler check if hoverNode exists
    const hoverNodeId = hoverNode?.id as string | undefined;

    // Determine TARGET states
    graphData.nodes.forEach(node => {
      const nodeId = node.id as string;
      // Highlighted means it's the hovered node OR a direct neighbor (only relevant if isAnythingHovered)
      const isNodeInHoverGroup = isAnythingHovered && highlightNodes.has(nodeId);
      
      // Color: Purple if in hover group, otherwise Default Gray
      const targetColorRGB = isNodeInHoverGroup ? hexToRgb(NODE_HOVER_COLOR) : hexToRgb(NODE_DEFAULT_COLOR);
      // Opacity: 1 if in hover group OR nothing is hovered, else Dimmed
      const targetOpacity = !isAnythingHovered || isNodeInHoverGroup ? 1 : DIMMED_OPACITY;
      // Radius: Scaled only if THIS node is the one directly hovered
      const targetRadiusScale = (nodeId === hoverNodeId) ? HOVER_NODE_RADIUS_SCALE : BASE_NODE_RADIUS_SCALE;

      targetNodeStates.set(nodeId, {
          opacity: targetOpacity,
          colorRGB: targetColorRGB,
          radiusScale: targetRadiusScale,
      });
    });

    graphData.links.forEach((link) => {
        // Highlighted means it connects to the hovered node (only relevant if isAnythingHovered)
        const isLinkInHoverGroup = isAnythingHovered && highlightLinks.has(link);

        // Color: Purple if in hover group, otherwise Default Gray
        const targetColorRGB = isLinkInHoverGroup ? LINK_HOVER_COLOR_RGB : LINK_DEFAULT_COLOR_RGB;
        // Width: Hover width if in hover group, else Base width
        const targetWidth = isLinkInHoverGroup ? HOVER_LINK_WIDTH : BASE_LINK_WIDTH;
        // Opacity: Default link opacity if in hover group OR nothing is hovered, else Dimmed
        // Let's use a base opacity slightly lower than nodes even when not dimmed
        const baseLinkOpacity = 0.6;
        const targetOpacity = !isAnythingHovered || isLinkInHoverGroup ? baseLinkOpacity : DIMMED_OPACITY * 0.7;

        targetLinkStates.set(link, { 
            opacity: targetOpacity, 
            colorRGB: targetColorRGB,
            width: targetWidth,
        });
    });

    // Interpolate CURRENT animation state towards TARGET state 
    nodeAnimationState.current.forEach((currentState, nodeId) => {
        const targetState = targetNodeStates.get(nodeId);
        if (!targetState) return;
        const newOpacity = lerp(currentState.opacity, targetState.opacity, ANIMATION_LERP_FACTOR);
        const newColorRGB = lerpRGB(currentState.colorRGB, targetState.colorRGB, ANIMATION_LERP_FACTOR);
        const newRadiusScale = lerp(currentState.radiusScale, targetState.radiusScale, ANIMATION_LERP_FACTOR);
        if (Math.abs(newOpacity - currentState.opacity) > 0.001 || Math.abs(newColorRGB[0] - currentState.colorRGB[0]) > 0.1 || Math.abs(newRadiusScale - currentState.radiusScale) > 0.001) {
            nodeAnimationState.current.set(nodeId, { opacity: newOpacity, colorRGB: newColorRGB, radiusScale: newRadiusScale });
            changed = true;
        }
    });
    targetNodeStates.forEach((targetState, nodeId) => {
        if (!nodeAnimationState.current.has(nodeId)) {
             const initialColorRGB = hexToRgb(NODE_DEFAULT_COLOR); // Start all nodes at default color
             nodeAnimationState.current.set(nodeId, { ...targetState, opacity: 1, colorRGB: initialColorRGB }); // Ensure initial opacity is 1
             changed = true;
        }
    });
    linkAnimationState.current.forEach((currentState, linkKey) => {
        const targetState = targetLinkStates.get(linkKey);
         if (!targetState) return;
        const newOpacity = lerp(currentState.opacity, targetState.opacity, ANIMATION_LERP_FACTOR);
        const newColorRGB = lerpRGB(currentState.colorRGB, targetState.colorRGB, ANIMATION_LERP_FACTOR);
        const newWidth = lerp(currentState.width, targetState.width, ANIMATION_LERP_FACTOR);
        if (Math.abs(newOpacity - currentState.opacity) > 0.001 || Math.abs(newColorRGB[0] - currentState.colorRGB[0]) > 0.1 || Math.abs(newWidth - currentState.width) > 0.001) {
            linkAnimationState.current.set(linkKey, { opacity: newOpacity, colorRGB: newColorRGB, width: newWidth });
            changed = true;
        }
    });
    targetLinkStates.forEach((targetState, linkKey) => {
         if (!linkAnimationState.current.has(linkKey)) {
            const initialColorRGB = LINK_DEFAULT_COLOR_RGB; // Start all links at default color
            linkAnimationState.current.set(linkKey, { ...targetState, opacity: 0.6, colorRGB: initialColorRGB }); // Ensure initial opacity is default
            changed = true;
        }
    });

  }, [hoverNode, highlightNodes, highlightLinks, lerp, lerpRGB]); 

  // Node painting using interpolated values
  const nodePaint = useCallback((node: FGNodeObject<NodeData>, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const animState = nodeAnimationState.current.get(node.id as string) ?? {
        opacity: DIMMED_OPACITY, colorRGB: hexToRgb(NODE_DEFAULT_COLOR), radiusScale: BASE_NODE_RADIUS_SCALE
    };

    const label = node.name || '';
    const baseFontSize = 10;
    const minFontSize = 4;
    const maxFontSize = 12;
    const fontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize / Math.sqrt(globalScale)));
    const baseNodeRadius = Math.sqrt(Math.max(0, node.val || 1)) * BASE_NODE_RADIUS_SCALE;
    const nodeRadius = baseNodeRadius * animState.radiusScale; 
    const labelOffset = nodeRadius + 3 / globalScale; 

    const nodeColor = `rgba(${Math.round(animState.colorRGB[0])}, ${Math.round(animState.colorRGB[1])}, ${Math.round(animState.colorRGB[2])}, ${animState.opacity})`;
    const labelColor = TEXT_COLOR; 
    const nodeOpacity = animState.opacity; // Opacity is now part of the color
    const borderOpacity = animState.opacity * 0.5; 
    const textOpacity = animState.opacity;

    // Draw node circle (use calculated rgba color)
    ctx.fillStyle = nodeColor;
    ctx.beginPath();
    ctx.arc(node.x ?? 0, node.y ?? 0, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fill();

    // Draw border
    ctx.strokeStyle = NODE_BORDER_COLOR;
    ctx.globalAlpha = borderOpacity;
    ctx.lineWidth = 0.3 / globalScale; 
    ctx.stroke();
    ctx.globalAlpha = 1; 

    // Draw label
    ctx.font = `${fontSize}px Inter, Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top'; // Label still above node
    ctx.fillStyle = labelColor;
    ctx.globalAlpha = textOpacity; 
    ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + labelOffset);
    ctx.globalAlpha = 1; 
  }, []); 

  // Define the hover/pointer interaction area
  const nodePointerAreaPaint = useCallback((node: FGNodeObject<NodeData>, color: string, ctx: CanvasRenderingContext2D) => {
      // Calculate the *visual* base radius first (ignoring hover scale for hitbox consistency)
      const visualBaseRadius = Math.sqrt(Math.max(0, node.val || 1)) * BASE_NODE_RADIUS_SCALE;
      // Define the hitbox radius - larger than the visual radius
      const hoverRadius = visualBaseRadius * NODE_HOVER_AREA_RADIUS_MULTIPLIER;

      // Draw the invisible pointer area circle
      ctx.fillStyle = color; // Use the color passed by the library (usually transparent black)
      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, hoverRadius, 0, 2 * Math.PI, false);
      ctx.fill();
  }, []); // Depends only on constants

  // Link styling using interpolated values
  const linkColor = useCallback((link: FGLinkObject<NodeData, LinkData>) => {
      const animState = linkAnimationState.current.get(link) ?? { 
          opacity: DIMMED_OPACITY * 0.5, colorRGB: LINK_DEFAULT_COLOR_RGB, width: BASE_LINK_WIDTH 
      };
      return `rgba(${Math.round(animState.colorRGB[0])}, ${Math.round(animState.colorRGB[1])}, ${Math.round(animState.colorRGB[2])}, ${animState.opacity})`;
  }, []); // No dependencies as state is in ref

  const linkWidth = useCallback((link: FGLinkObject<NodeData, LinkData>) => {
    const animState = linkAnimationState.current.get(link) ?? { 
        opacity: DIMMED_OPACITY * 0.5, colorRGB: LINK_DEFAULT_COLOR_RGB, width: BASE_LINK_WIDTH 
    };
    return animState.width; 
  }, []);

  return (
    <div 
      ref={containerRef} // Restore ref for dimension calculation
      className="w-full h-full overflow-hidden rounded-lg border border-gray-700 bg-[#202023] flex items-center justify-center text-foreground/50"
    >
      {dimensions.width > 0 && dimensions.height > 0 ? (
        <ForceGraph2D<NodeData, LinkData>
          graphData={graphData} // Restore actual data
          width={dimensions.width} // Restore dynamic dimensions
          height={dimensions.height}
          backgroundColor={OBSIDIAN_BG}
          nodeRelSize={1}
          nodeCanvasObject={nodePaint} // Restore detailed paint function
          nodePointerAreaPaint={nodePointerAreaPaint} // Add the hover area painting
          onNodeHover={node => setHoverNode(node)} // Restore state update
          linkColor={linkColor} // Restore link styling callback
          linkWidth={linkWidth} // Restore link styling callback
          linkDirectionalParticles={0}
          // Keep physics running for smoother interactions
          cooldownTicks={Infinity} 
          // Adjust physics parameters for smoother feel
          d3AlphaDecay={0.015} // Slower cooling 
          d3VelocityDecay={0.55} // Increased friction/damping
          warmupTicks={100} // Ensure sufficient warmup
          onNodeDrag={node => { /* Removed log */ }}
          onNodeDragEnd={node => { 
            // Removed logs
            if (node) {
              node.fx = node.x; // Keep fixing position after drag
              node.fy = node.y;
            }
          }}
          // Add the engine tick handler
          onEngineTick={handleEngineTick}
        />
      ) : (
        <span>Loading Graph...</span>
      )}
    </div>
  );
};

export default SkillsGraph; 