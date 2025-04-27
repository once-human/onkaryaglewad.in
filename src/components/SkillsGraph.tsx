"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
// Statically import, relying on parent dynamic import for SSR control
import ForceGraph2D, { ForceGraphProps, NodeObject as FGNodeObject, LinkObject as FGLinkObject } from 'react-force-graph-2d';
import textData from '@/constants/textData'; // Import textData
import { NodeObject } from '@/types/interfaces'; // Import NodeObject type if needed for callback

// Define simpler types, inferring more from the library
// Ensure ID is consistently treated as string for lookup
interface NodeData { id: string; name: string; val?: number; textSegmentId?: string; }
interface LinkData {}

// REMOVE hardcoded graphData - it's now imported
// const graphData = { ... };
const graphData = textData.aboutPageGraphData; // Use imported data

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

// Define Props for SkillsGraph to accept the callback
interface SkillsGraphProps {
  onNodeHoverCallback: (nodeData: FGNodeObject<NodeData> | null) => void;
}

const SkillsGraph: React.FC<SkillsGraphProps> = ({ onNodeHoverCallback }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<FGLinkObject<NodeData, LinkData>>>(new Set());
  const [hoverNode, setHoverNode] = useState<FGNodeObject<NodeData> | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false); // Track dragging state
  const [forceTick, setForceTick] = useState<number>(0); // ADDED: State to force re-render

  const nodeAnimationState = useRef<Map<string, NodeAnimState>>(new Map());
  const linkAnimationState = useRef<Map<FGLinkObject<NodeData, LinkData>, LinkAnimState>>(new Map());

  const graphRef = useRef<any>(); // Ref to access graph instance methods

  // Calculate Default Highlight Sets
  const { defaultHighlightNodes, defaultHighlightLinks } = useMemo(() => {
    const centralNodeId = "Onkar Yaglewad";
    const nodes = new Set<string>();
    const links = new Set<FGLinkObject<NodeData, LinkData>>();

    const centralNode = graphData.nodes.find(n => n.id === centralNodeId);
    if (centralNode) {
      nodes.add(centralNodeId);
      graphData.links.forEach(link => {
        const sourceId = typeof link.source === 'object' && link.source !== null ? (link.source as FGNodeObject<NodeData>).id : link.source as string | number | undefined;
        const targetId = typeof link.target === 'object' && link.target !== null ? (link.target as FGNodeObject<NodeData>).id : link.target as string | number | undefined;

        if (sourceId === centralNodeId) {
          links.add(link);
          if (targetId) nodes.add(targetId as string);
        } else if (targetId === centralNodeId) {
          links.add(link);
          if (sourceId) nodes.add(sourceId as string);
        }
      });
    }
    console.log("[Default Highlights] Nodes:", nodes);
    console.log("[Default Highlights] Links:", links.size);
    return { defaultHighlightNodes: nodes, defaultHighlightLinks: links };
  }, []); // Only compute once on mount

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

  // Highlight calculation effect (based on actual hover/drag)
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
    console.log("[Highlight Effect] Calculated Highlight Links:", newHighlightLinks.size);
    setHighlightNodes(newHighlightNodes);
    setHighlightLinks(newHighlightLinks);
  }, [hoverNode]);

  // ADDED: Effect to force periodic re-renders for float animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setForceTick(tick => tick + 1);
    }, 100); // Update every 100ms

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Run once on mount

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

  // Engine tick effect for animation updates - ADJUST ROOT NODE DEFAULT COLOR
  const handleEngineTick = useCallback(() => {
    let changed = false;
    const targetNodeStates = new Map<string, NodeAnimState>();
    const targetLinkStates = new Map<FGLinkObject<NodeData, LinkData>, LinkAnimState>();

    const activeHighlightNodes = hoverNode ? highlightNodes : defaultHighlightNodes;
    const activeHighlightLinks = hoverNode ? highlightLinks : defaultHighlightLinks;
    const isAnythingHighlighted = activeHighlightNodes.size > 0;
    const currentHoveredNodeId = hoverNode?.id as string | undefined;
    const centralNodeId = "Onkar Yaglewad"; // ID of the root node

    // Determine TARGET states based on the active highlight set
    graphData.nodes.forEach(node => {
      const nodeId = node.id as string;
      const isNodeInActiveGroup = isAnythingHighlighted && activeHighlightNodes.has(nodeId);

      let targetColorRGB;
      if (isNodeInActiveGroup) {
        // If node is in the currently highlighted group (default or hover)
        targetColorRGB = hexToRgb(NODE_HOVER_COLOR);
      } else if (!hoverNode && nodeId === centralNodeId) {
          // SPECIAL CASE: If nothing is hovered, keep the root node highlighted
          targetColorRGB = hexToRgb(NODE_HOVER_COLOR);
          // Ensure root is part of active highlights for opacity/label logic if needed
          // This shouldn't strictly be needed if defaultHighlightNodes is calculated correctly,
          // but adding belt-and-suspenders check:
          if (!activeHighlightNodes.has(nodeId)) activeHighlightNodes.add(nodeId);
      } else {
        // Otherwise, use the default dimmed color
        targetColorRGB = hexToRgb(NODE_DEFAULT_COLOR);
      }

      const targetOpacity = !isAnythingHighlighted || activeHighlightNodes.has(nodeId) ? 1 : DIMMED_OPACITY;
      const targetRadiusScale = (nodeId === currentHoveredNodeId) ? HOVER_NODE_RADIUS_SCALE : BASE_NODE_RADIUS_SCALE;

      targetNodeStates.set(nodeId, {
          opacity: targetOpacity,
          colorRGB: targetColorRGB,
          radiusScale: targetRadiusScale,
      });
    });

    // Determine link target states (no special change for root needed here)
    graphData.links.forEach((link) => {
        const isLinkInActiveGroup = isAnythingHighlighted && activeHighlightLinks.has(link);
        const targetColorRGB = isLinkInActiveGroup ? LINK_HOVER_COLOR_RGB : LINK_DEFAULT_COLOR_RGB;
        const targetWidth = isLinkInActiveGroup ? HOVER_LINK_WIDTH : BASE_LINK_WIDTH;
        const baseLinkOpacity = 0.6;
        const targetOpacity = !isAnythingHighlighted || isLinkInActiveGroup ? baseLinkOpacity : DIMMED_OPACITY * 0.7;

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

  }, [hoverNode, highlightNodes, highlightLinks, defaultHighlightNodes, defaultHighlightLinks, lerp, lerpRGB]); // Added default highlight dependencies

  // Node painting using interpolated values - Uses forceTick implicitly via re-render
  const nodePaint = useCallback((node: FGNodeObject<NodeData>, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const animState = nodeAnimationState.current.get(node.id as string) ?? {
        opacity: DIMMED_OPACITY, colorRGB: hexToRgb(NODE_DEFAULT_COLOR), radiusScale: BASE_NODE_RADIUS_SCALE
    };
    const label = node.name || '';

    // --- Subtle Float Calculation ---
    const floatAmplitude = 3.0; // Increased from 1.5
    const floatSpeed = 0.0005;
    // Basic hash function from node ID to vary the phase
    let hash = 0;
    const idStr = String(node.id);
    for (let i = 0; i < idStr.length; i++) {
        hash = (hash << 5) - hash + idStr.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    const time = performance.now();
    const offsetX = floatAmplitude * Math.sin(floatSpeed * time + hash);
    const offsetY = floatAmplitude * Math.cos(floatSpeed * time + hash);
    // --- End Subtle Float Calculation ---

    const baseFontSize = 10;
    const minFontSize = 4;
    const maxFontSize = 12;
    const fontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize / Math.sqrt(globalScale)));
    const baseNodeRadius = Math.sqrt(Math.max(0, node.val || 1)) * BASE_NODE_RADIUS_SCALE;
    const nodeRadius = baseNodeRadius * animState.radiusScale;
    const labelOffset = nodeRadius + 3 / globalScale;

    const nodeColor = `rgba(${Math.round(animState.colorRGB[0])}, ${Math.round(animState.colorRGB[1])}, ${Math.round(animState.colorRGB[2])}, ${animState.opacity})`;
    const labelColor = TEXT_COLOR;
    const borderOpacity = animState.opacity * 0.5;
    const textOpacity = animState.opacity;

    // Apply float offset to drawing coordinates
    const drawX = (node.x ?? 0) + offsetX;
    const drawY = (node.y ?? 0) + offsetY;

    // Draw node circle
    ctx.fillStyle = nodeColor;
    ctx.beginPath();
    ctx.arc(drawX, drawY, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fill();

    // Draw border
    ctx.strokeStyle = NODE_BORDER_COLOR;
    ctx.globalAlpha = borderOpacity;
    ctx.lineWidth = 0.3 / globalScale;
    ctx.beginPath();
    ctx.arc(drawX, drawY, nodeRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Determine if label should be drawn based on zoom (2.0) or active highlight status
    const activeHighlightNodes = hoverNode ? highlightNodes : defaultHighlightNodes;
    const shouldDrawLabel = globalScale >= 2.0 || activeHighlightNodes.has(node.id as string);

    // Draw label conditionally
    if (shouldDrawLabel) {
        ctx.font = `${fontSize}px Inter, Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = labelColor;
        ctx.globalAlpha = textOpacity;
        ctx.fillText(label, drawX, drawY + labelOffset);
        ctx.globalAlpha = 1;
    }
  }, [hoverNode, highlightNodes, defaultHighlightNodes]);

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

  // Effect to modify forces via ref - Moderate Settings for Hierarchy
  useEffect(() => {
    if (graphRef.current) {
      // Charge force (Moderate repulsion)
      const chargeForce = graphRef.current.d3Force('charge') as any;
      if (chargeForce) {
        chargeForce.strength(-1000); // Reverted from -1200
      }

      // Link force (Increased distance, Moderate Strength)
      const linkForce = graphRef.current.d3Force('link') as any;
      if (linkForce) {
        linkForce.distance(180).strength(0.03); // Reverted strength from 0.005
      }

      // Collision force (Moderate Radius Multiplier)
      const collisionRadius = (node: FGNodeObject<NodeData>) => {
        const baseRadius = Math.sqrt(Math.max(0, node.val || 1)) * BASE_NODE_RADIUS_SCALE;
        return baseRadius * 1.8; // Reduced multiplier from 4.0, slightly increased from 1.4
      };
      try {
        const forceCollide = (graphRef.current.d3Force('collide', collisionRadius) as any);
        if (forceCollide) {
          if (typeof forceCollide.strength === 'function') {
            forceCollide.strength(0.8);
          }
        } else {
          console.warn("Could not get or set collide force by name.");
        }
      } catch (error) {
        console.error("Error setting collide force:", error);
      }

      // Keep Center force - Unchanged
      try {
        graphRef.current.d3Force('center', null);
        graphRef.current.d3Force('center');
      } catch (error) {
        console.error("Error setting center force:", error);
      }

      // No Y force

      graphRef.current.d3ReheatSimulation();
    }
  }, []); // Run once on mount

  // NEW Effect to set initial zoom - ADJUSTED
  useEffect(() => {
    const timer = setTimeout(() => { // Add a small delay to ensure graph is ready
      if (graphRef.current) {
        console.log("Setting initial zoom...");
        graphRef.current.zoom(1.3, 1000); // Zoom to 130% over 1 second (Changed from 1.5)
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Run once after mount

  // Hover handler - RESTORE TOOLTIP TRIGGER
  const handleNodeHover = useCallback((node: FGNodeObject<NodeData> | null) => {
    // Only update hover state if not currently dragging
    if (!isDragging) {
        console.log("[SkillsGraph Hover Handler] Raw node object:", node);
        setHoverNode(node);
        onNodeHoverCallback(node); // <-- UNCOMMENTED to trigger tooltip update
    }
  }, [onNodeHoverCallback, isDragging]);

  // Drag Handler (during drag) - RESTORE TOOLTIP TRIGGER
  const handleNodeDrag = useCallback((node: FGNodeObject<NodeData>) => {
    console.log("[SkillsGraph Drag Handler] Dragging node:", node?.id);
    setIsDragging(true);
    // Update hover node *during* drag to keep highlight active
    if (hoverNode?.id !== node.id) { // Avoid unnecessary state updates
        setHoverNode(node);
        onNodeHoverCallback(node); // <-- UNCOMMENTED to trigger tooltip update
    }
  }, [hoverNode, onNodeHoverCallback]);

  // Drag End Handler - Keep clearing tooltip
  const handleNodeDragEnd = useCallback((node: FGNodeObject<NodeData> | null) => {
    console.log("[SkillsGraph Drag End Handler] Finished dragging node:", node?.id);
    if (node) {
      node.fx = node.x;
      node.fy = node.y;
    }
    setIsDragging(false);
    setHoverNode(null);
    onNodeHoverCallback(null);
  }, [onNodeHoverCallback]);

  return (
    <div
      ref={containerRef}
      // Darker background, even subtler border for seamless look
      className="w-full h-full overflow-hidden rounded-lg border border-gray-900 bg-[#1A1A1D] flex items-center justify-center text-foreground/50"
    >
      {dimensions.width > 0 && dimensions.height > 0 ? (
        <ForceGraph2D<NodeData, LinkData>
          ref={graphRef} // Assign ref to the graph component
          graphData={graphData} // Restore actual data
          width={dimensions.width} // Restore dynamic dimensions
          height={dimensions.height}
          backgroundColor="transparent"
          nodeRelSize={1}
          nodeCanvasObject={nodePaint} // Restore detailed paint function
          nodePointerAreaPaint={nodePointerAreaPaint} // Add the hover area painting
          onNodeHover={handleNodeHover} // Use the modified hover handler
          linkColor={linkColor} // Restore link styling callback
          linkWidth={linkWidth} // Restore link styling callback
          linkDirectionalParticles={0}
          cooldownTicks={Infinity}
          warmupTicks={500}
          d3AlphaDecay={0.01}
          d3AlphaMin={0} // Keep this just in case
          d3VelocityDecay={0.3}
          onNodeDrag={handleNodeDrag} // Use onNodeDrag for continuous update
          onNodeDragEnd={handleNodeDragEnd} // Use modified drag end handler
          onEngineTick={handleEngineTick} // Restore engine tick handler
        />
      ) : (
        <span className="text-sm">Loading Graph...</span>
      )}
    </div>
  );
};

export default SkillsGraph; 