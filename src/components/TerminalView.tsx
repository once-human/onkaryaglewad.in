"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useTerminal } from '@/context/TerminalContext';
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi"; // Icon for new tab button
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'; // Import motion components

// Define segment type for colored output
type OutputSegment = string | { text: string; className: string };

interface HistoryItem {
  id: number;
  command?: string; // Make command optional for system output
  prompt?: string;  // Make prompt optional
  output?: OutputSegment[][]; // Changed to array of segment arrays
}

interface Tab {
  id: number;
  title: string;
  history: HistoryItem[];
  currentInputValue: string; // Added to store input per tab
}

const MAX_TABS = 5;

// Updated Modal Animation Variants (Scale + Fade)
const modalVariants = {
  hidden: { opacity: 0, scale: 0.97 }, // Start slightly smaller
  visible: { opacity: 1, scale: 1 },    // Animate to full size
  exit: { opacity: 0, scale: 0.97 }     // Exit to slightly smaller
};

const tabVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.1 } } // Faster exit
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// Define colors
const LOGO_COLOR = "text-cyan-400";
const USER_HOST_COLOR = "text-cyan-400";
const LABEL_COLOR = "text-blue-400"; // Using blue as requested
const VALUE_COLOR = "text-gray-200"; // Default text color

// Structured and Colored Neofetch Output
const neofetchOutput: OutputSegment[][] = [
  [{ text: "                   -`                  ", className: LOGO_COLOR }, { text: "onkar@arch", className: USER_HOST_COLOR }],
  [{ text: "                  .o+`                 ", className: LOGO_COLOR }, { text: "OS", className: LABEL_COLOR }, { text: ": Arch Linux x86_64", className: VALUE_COLOR }],
  [{ text: "                 `ooo/                 ", className: LOGO_COLOR }, { text: "Host", className: LABEL_COLOR }, { text: ": HP 250 G8 Notebook PC", className: VALUE_COLOR }],
  [{ text: "                `+oooo:                ", className: LOGO_COLOR }, { text: "Kernel", className: LABEL_COLOR }, { text: ": 6.13.8-zen1-1-zen", className: VALUE_COLOR }],
  [{ text: "               `+oooooo:               ", className: LOGO_COLOR }, { text: "Uptime", className: LABEL_COLOR }, { text: ": 1 hour, 21 mins", className: VALUE_COLOR }],
  [{ text: "               -+oooooo+:              ", className: LOGO_COLOR }, { text: "Packages", className: LABEL_COLOR }, { text: ": 1610 (pacman), 15 (flatpak)", className: VALUE_COLOR }],
  [{ text: "             `/:-:++oooo+:             ", className: LOGO_COLOR }, { text: "Shell", className: LABEL_COLOR }, { text: ": zsh 5.9", className: VALUE_COLOR }],
  [{ text: "            `/++++/+++++++:            ", className: LOGO_COLOR }, { text: "Resolution", className: LABEL_COLOR }, { text: ": 1366x768", className: VALUE_COLOR }],
  [{ text: "           `/++++++++++++++:           ", className: LOGO_COLOR }, { text: "DE", className: LABEL_COLOR }, { text: ": Hyprland", className: VALUE_COLOR }],
  [{ text: "          `/+++ooooooooooooo/`         ", className: LOGO_COLOR }, { text: "Theme", className: LABEL_COLOR }, { text: ": adw-gtk3-dark [GTK3]", className: VALUE_COLOR }],
  [{ text: "         ./ooosssso++osssssso+`        ", className: LOGO_COLOR }, { text: "Icons", className: LABEL_COLOR }, { text: ": Adwaita [GTK3]", className: VALUE_COLOR }],
  [{ text: "        .oossssso-````/ossssss+`       ", className: LOGO_COLOR }, { text: "Terminal", className: LABEL_COLOR }, { text: ": foot", className: VALUE_COLOR }],
  [{ text: "       -osssssso.      :ssssssso.      ", className: LOGO_COLOR }, { text: "CPU", className: LABEL_COLOR }, { text: ": 11th Gen Intel i3-1115G4 (4) @ 4.100GHz", className: VALUE_COLOR }],
  [{ text: "      :osssssss/        osssso+++.     ", className: LOGO_COLOR }, { text: "GPU", className: LABEL_COLOR }, { text: ": Intel Tiger Lake-LP GT2 [UHD Graphics G4]", className: VALUE_COLOR }],
  [{ text: "     /ossssssss/        +ssssooo/-     ", className: LOGO_COLOR }, { text: "Memory", className: LABEL_COLOR }, { text: ": 10337MiB / 15726MiB", className: VALUE_COLOR }],
  [{ text: "   `/ossssso+/:-        -:/+osssso+-   ", className: LOGO_COLOR }],
  [{ text: "  `+sso+:-`                 `.-/+oso:  ", className: LOGO_COLOR }],
  [{ text: " `++:.                           `-/+/ ", className: LOGO_COLOR }],
  [{ text: " .`                                 `/  ", className: LOGO_COLOR }],
  [""], // Empty line
];

// --- Command Definitions ---
const commands: { [key: string]: (args: string[], setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) => OutputSegment[][] | null } = {
  help: (args, setHistory) => [
    [{ text: 'Available Commands:', className: 'text-green-400' }],
    [{ text: '  help', className: 'text-blue-400' }, { text: '     - Show this help message', className: VALUE_COLOR }],
    [{ text: '  neofetch', className: 'text-blue-400' }, { text: ' - Display system information', className: VALUE_COLOR }],
    [{ text: '  clear', className: 'text-blue-400' }, { text: '    - Clear the terminal screen', className: VALUE_COLOR }],
    [{ text: '  echo', className: 'text-blue-400' }, { text: '     - Print arguments to the terminal', className: VALUE_COLOR }],
    // Add more commands here
  ],
  neofetch: (args, setHistory) => neofetchOutput,
  echo: (args, setHistory) => [[{ text: args.join(' '), className: VALUE_COLOR }]],
  clear: (args, setHistory) => {
    // Special handling for clear: Modify history directly
    setHistory([{ id: Date.now(), output: [ [{ text: 'Terminal cleared.', className: 'text-yellow-500' }] ] }]); // Or just setHistory([])
    return null; // Indicate no standard output item should be added
  },
  // Example of unknown command handling is done in handleKeyDown
};
// --- End Command Definitions ---

export default function TerminalView() {
  const { isTerminalOpen, toggleTerminal } = useTerminal();
  const [tabs, setTabs] = useState<Tab[]>([{ 
    id: 1, 
    title: 'zsh', 
    history: [{ id: Date.now(), output: neofetchOutput }], // Use structured output
    currentInputValue: '' 
  }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 means not navigating
  const [preNavigationInput, setPreNavigationInput] = useState(''); // Store input before history nav
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Derived state for the active tab's history
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const activeHistory = activeTab?.history ?? [];
  const currentInputValue = activeTab?.currentInputValue ?? ''; // Get value directly from active tab

  // Simulate username and hostname for the prompt
  const username = "guest";
  const hostname = "onkaryaglewad.in";
  const currentDir = "~";
  // Use USER_HOST_COLOR for prompt parts
  const promptString = `[${username}@${hostname} ${currentDir}]$`; 
  const promptPrefix = (<>
     <span className={USER_HOST_COLOR}>[{username}@{hostname}</span>
     <span className="text-purple-400 px-1">{currentDir}</span>
     <span className={USER_HOST_COLOR}>]$</span>
  </>); 

  // Get only the commands from the active history for navigation
  const commandHistory = activeHistory.filter(item => item.command !== undefined);

  // Reset history index when active tab changes
  useEffect(() => {
    setHistoryIndex(-1);
    setPreNavigationInput('');
  }, [activeTabId]);

  // Focus input when terminal opens or active tab changes
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isTerminalOpen, activeTabId]);

  // Scroll to bottom when active history changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [activeHistory]); // Depend on activeHistory

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTabs(prevTabs =>
      prevTabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, currentInputValue: newValue }
          : tab
      )
    );
    // If user types, reset history navigation
    setHistoryIndex(-1);
    setPreNavigationInput(''); // Clear saved input as well
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentTab = tabs.find(t => t.id === activeTabId);
    if (!currentTab) return;

    const currentCommand = currentTab.currentInputValue; // Don't trim here yet

    // --- History Navigation Logic ---
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      let newIndex;
      if (historyIndex === -1) { // Start navigating
        setPreNavigationInput(currentCommand); // Save current input
        newIndex = commandHistory.length - 1;
      } else {
        newIndex = Math.max(0, historyIndex - 1);
      }

      if (newIndex !== historyIndex) {
        setHistoryIndex(newIndex);
        const historyCommand = commandHistory[newIndex].command ?? '';
        // Update state for consistency
        setTabs(prevTabs =>
          prevTabs.map(tab =>
            tab.id === activeTabId ? { ...tab, currentInputValue: historyCommand } : tab
          )
        );
        // Directly update input value for immediate feedback
        if (inputRef.current) {
          inputRef.current.value = historyCommand;
          // Optional: Move cursor to end after setting value
          setTimeout(() => inputRef.current?.setSelectionRange(historyCommand.length, historyCommand.length), 0);
        }
      }

    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return; // Not navigating, do nothing

      let newIndex = historyIndex + 1;
      let valueToSet = '';

      if (newIndex < commandHistory.length) {
        // Move down in history
        setHistoryIndex(newIndex);
        valueToSet = commandHistory[newIndex].command ?? '';
      } else {
        // Reached the end or went past, restore original input
        setHistoryIndex(-1); // Stop navigating
        valueToSet = preNavigationInput;
        setPreNavigationInput(''); // Clear saved input
      }

      // Update state for consistency
      setTabs(prevTabs =>
        prevTabs.map(tab =>
          tab.id === activeTabId ? { ...tab, currentInputValue: valueToSet } : tab
        )
      );
      // Directly update input value for immediate feedback
      if (inputRef.current) {
        inputRef.current.value = valueToSet;
        // Optional: Move cursor to end after setting value
        setTimeout(() => inputRef.current?.setSelectionRange(valueToSet.length, valueToSet.length), 0);
      }

    } else if (e.key === 'Enter') {
      if (currentCommand.trim() === '') return; // Ignore empty input
      e.preventDefault();
      setHistoryIndex(-1); // Reset history navigation on Enter
      setPreNavigationInput(''); // Clear saved input

      // --- Command Processing Logic (existing) ---
      const trimmedCommand = currentCommand.trim();
      // 1. Create history item for the user input
      const userInputHistoryItem: HistoryItem = {
        id: Date.now(),
        prompt: promptString, // Use the raw string prompt
        command: trimmedCommand, // Use trimmed command here
      };

      // 2. Process the command
      const parts = trimmedCommand.split(' ');
      const commandName = parts[0];
      const args = parts.slice(1);
      const commandHandler = commands[commandName];

      let outputHistoryItem: HistoryItem | null = null;

      // Update state function specific to the current tab
      const setActiveTabHistory = (newHistory: HistoryItem[] | ((prevHistory: HistoryItem[]) => HistoryItem[])) => {
         setTabs(prevTabs =>
           prevTabs.map(tab =>
             tab.id === activeTabId
               ? { ...tab, history: typeof newHistory === 'function' ? newHistory(tab.history) : newHistory }
               : tab
           )
         );
      };

      if (commandHandler) {
        // Special handling for 'clear' is inside its handler
        const outputSegments = commandHandler(args, (updater) => {
          // Allow command to directly set history (for 'clear')
           setTabs(prevTabs =>
             prevTabs.map(tab =>
               tab.id === activeTabId
                 ? { ...tab, history: typeof updater === 'function' ? updater(tab.history) : updater, currentInputValue: '' } // Clear input on clear
                 : tab
             )
           );
        });

        if (outputSegments) { // If command returned output (i.e., not 'clear')
          outputHistoryItem = {
            id: Date.now() + 1, // Ensure unique ID
            output: outputSegments,
          };
        }
      } else {
        // Unknown command
        outputHistoryItem = {
          id: Date.now() + 1,
          output: [[{ text: `zsh: command not found: ${commandName}`, className: 'text-red-500' }]],
        };
      }

      // 3. Update history for the active tab
      setTabs(prevTabs =>
        prevTabs.map(tab => {
          if (tab.id === activeTabId) {
             const newHistory = [...tab.history, userInputHistoryItem];
             if (outputHistoryItem) { // Add output item if it exists
               newHistory.push(outputHistoryItem);
             }
             return { ...tab, history: newHistory, currentInputValue: '' }; // Clear input value
          }
          return tab;
        })
      );

      // 4. Refocus the input field and scroll to bottom
      // Use setTimeout to ensure focus/scroll happens after the state update and re-render
      setTimeout(() => {
        inputRef.current?.focus();
        if (bodyRef.current) {
          bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
      }, 0);

      // Ensure input value matches cleared state if command executes
      if (inputRef.current) {
        inputRef.current.value = ''; 
      }

    } else {
      // Any other key press might indicate user is typing a new command
      // Resetting is handled primarily by handleInputChange, but good to be safe
      // setHistoryIndex(-1); // This might interfere if user edits a history command
    }
  };

  const switchTab = (id: number) => {
    setActiveTabId(id);
    // Focus will be handled by the useEffect
  };

  const addTab = () => {
    if (tabs.length >= MAX_TABS) return; // Enforce tab limit

    const newId = tabs.length > 0 ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    setTabs([...tabs, { id: newId, title: 'zsh', history: [], currentInputValue: '' }]);
    switchTab(newId);
  };

  const closeTab = (idToClose: number) => {
    // Prevent closing the last tab
    if (tabs.length <= 1) return;

    // Determine the new active tab *before* filtering
    let newActiveTabId = activeTabId;
    if (activeTabId === idToClose) {
        const closedTabIndex = tabs.findIndex(tab => tab.id === idToClose);
        const potentialNewTab = tabs[closedTabIndex - 1] ?? tabs.find((tab, index) => index === 1 && tab.id !== idToClose) ?? tabs.find(tab => tab.id !== idToClose);
        newActiveTabId = potentialNewTab ? potentialNewTab.id : 0; // Fallback to 0 if no tabs left (shouldn't happen)
    }
    
    // Filter out the closed tab
    const remainingTabs = tabs.filter(tab => tab.id !== idToClose);
    setTabs(remainingTabs);

    // If the active tab was closed, set the new active tab ID
    if (activeTabId === idToClose && newActiveTabId !== 0) {
        setActiveTabId(newActiveTabId);
        // The useEffect will handle setting the input value and focus
    } else if (activeTabId === idToClose && remainingTabs.length > 0) {
        // Edge case fallback if the primary logic failed to find a new tab
        setActiveTabId(remainingTabs[0].id);
    }
    // If a different tab was closed, no need to change activeTabId
  };

  if (!isTerminalOpen) {
    return null;
  }

  return (
    // Animate Presence for modal open/close
    <AnimatePresence>
      {isTerminalOpen && (
        // Overlay
        <motion.div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-lg flex items-center justify-center p-4"
          variants={overlayVariants} // Use overlay variants
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }} // Slightly longer duration for overlay
          onClick={toggleTerminal} 
        >
          {/* Terminal Modal - Animate scale and opacity */}
          <motion.div 
            className="z-50 flex flex-col bg-transparent text-gray-200 text-sm shadow-2xl rounded-2xl w-full max-w-4xl h-3/4 overflow-hidden"
            variants={modalVariants} // Use updated scale/fade variants
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }} // Matched duration, standard ease
            onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
          >
            {/* Header with Tabs - Removed pt-2 */}
            <div className="bg-gray-800/70 flex items-center border-b border-gray-700 h-9">
              {/* Tab List Container */}
               {/* LayoutGroup for animating layout changes (tab add/remove/resize) */}
              <LayoutGroup id="terminal-tabs">
                 <div className="flex-grow flex self-stretch overflow-hidden"> {/* Adjusted padding */}
                   <AnimatePresence initial={false}> {/* Animate tab add/remove */} 
                      {tabs.map(tab => (
                        <motion.button 
                          key={tab.id} 
                          layout // Keep layout animation
                          variants={tabVariants} // Use tab variants
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onClick={() => switchTab(tab.id)}
                          className={`relative flex-1 min-w-0 flex items-center justify-between space-x-2 px-3 rounded-t-md text-xs transition-colors truncate self-stretch ${ 
                            activeTabId !== tab.id && 'hover:bg-gray-700/60 hover:text-gray-200' // Hover only on inactive
                          }`}
                          style={{ backgroundColor: activeTabId !== tab.id ? 'rgba(55, 65, 81, 0.4)' : 'transparent' }}
                        >
                          <span className="truncate flex-shrink mr-1 z-10 relative">{tab.title}</span> 
                          {/* Active Tab Indicator using layoutId */}
                          {activeTabId === tab.id && (
                             <motion.div 
                                layoutId="active-tab-indicator" // Match this ID
                                className="absolute inset-0 rounded-t-md bg-gray-900/90" // Match modal background
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }} // Use tween with ease
                             />
                           )}
                          {/* Close Button per Tab */} 
                          {tabs.length > 1 && (
                            <motion.button 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1, transition: { delay: 0.1 } }} // Slight delay on appear
                              exit={{ opacity: 0 }}
                              onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }} 
                              className="relative z-10 p-0.5 rounded hover:bg-gray-600/50 flex-shrink-0 text-gray-400 hover:text-gray-100"
                              aria-label={`Close tab ${tab.title}`}
                            >
                              <IoClose size={12} />
                            </motion.button>
                          )}
                        </motion.button>
                      ))}
                   </AnimatePresence>
                 </div>
               </LayoutGroup>
              {/* New Tab Button */} 
              {tabs.length < MAX_TABS && (
                <motion.button 
                  layout
                  onClick={addTab}
                  className="p-1.5 ml-1 text-gray-400 hover:bg-gray-700/80 hover:text-gray-200 rounded-md flex-shrink-0 self-center"
                  aria-label="New Tab"
                >
                  <FiPlus size={14}/>
                </motion.button>
              )}
              {/* Close Window Button */} 
              <motion.button
                layout
                onClick={toggleTerminal}
                className="text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 flex-shrink-0 self-center"
                aria-label="Close terminal window"
              >
                <IoClose size={18} />
              </motion.button>
            </div>

            {/* Terminal Body - Active tab background blends into this */}
            <div 
              ref={bodyRef} 
               // Set background to match active tab indicator
              className="flex-grow p-4 bg-gray-900/90 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-black/40 font-mono relative"
              onClick={() => inputRef.current?.focus()} 
            >
              {/* Updated History Rendering */} 
              {activeHistory.map(item => (
                <div key={item.id} className="flex flex-wrap mb-1">
                  {item.output ? (
                    // Render structured output lines
                    <div className="w-full whitespace-pre-wrap">
                      {item.output.map((line, lineIndex) => (
                        <div key={lineIndex} className="flex"> {/* Use flex for potential side-by-side */} 
                          {line.map((segment, segIndex) => {
                            const isAsciiArt = typeof segment !== 'string' && segment.className === LOGO_COLOR && segIndex === 0;
                            return typeof segment === 'string' 
                              ? <span key={segIndex}>{segment}</span> 
                              : <span 
                                  key={segIndex} 
                                  className={`${segment.className} ${isAsciiArt ? 'hidden md:inline-block pr-4' : ''}`} // Hide ASCII on small screens, add padding when shown
                                >
                                  {segment.text}
                                </span>
                          })}
                        </div>
                      ))}
                    </div>
                  ) : item.prompt && item.command !== undefined ? (
                     // Render user command line (using promptPrefix for consistent coloring)
                    <div className="w-full flex"> {/* Wrap prompt/command in a div */}
                      {promptPrefix}
                      <span className="ml-2 text-gray-200 break-words flex-1">{item.command}</span>
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Current Input Line */} 
              <div className="flex items-center"> {/* Removed mt-1 */}
                <span className="flex-shrink-0">{promptPrefix}</span> {/* Wrap prompt, prevent shrinking */}
                <input 
                  ref={inputRef}
                  type="text"
                  value={currentInputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="ml-2 flex-1 bg-transparent text-gray-200 outline-none border-none focus:ring-0 p-0 m-0"
                  spellCheck="false"
                  autoComplete="off"
                  autoFocus
                />
                 {/* Cursor is implicitly handled by the focused input field now */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 