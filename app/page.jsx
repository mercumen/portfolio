"use client";
import React, { useState } from "react";
import ScrambleText from "./companents/scramble";
import BinaryRain from "./companents/BinaryRain";
/* Import the interactive agent component */
import PortfolioAgentDemo from "./companents/hr_animation";
import SalesAgentDemo from "./companents/leads_animation.jsx";
// Project data array
const projects = [
  {
    id: "naruva",
    title: "Naruva - Autonomous Guide Robot",
    description: "Graduation capstone project featuring ROS2, LiDAR integration, and sensor fusion for autonomous navigation.",
    tech: ["ROS2", "LiDAR", "Python", "C++"],
    
  },
  {
    id: "ai_agent",
    title: "AI Interview Agent",
    description: "Real-time AI bot integrated with Microsoft Teams and ElevenLabs for conducting automated technical interviews.",
    tech: ["Next.js", "ElevenLabs API", "WebRTC", "LLMs"],
    hasLiveDemo: true,
    demoComponent: "hr",
  },
  {
    id: "leads",
    title: "AI Sales Agent",
    description: "Conversational AI sales agent that qualifies leads, answers product questions, and guides prospects through the sales funnel autonomously.",
    tech: ["Next.js", "LLMs", "WebRTC", "AI Agents"],
    hasLiveDemo: true,
    demoComponent: "sales",
  },
  {
    id: "internal_tooling",
    title: "DOF Robotics - Internal Tooling",
    description: "Full stack dashboard and backend architecture leveraging RAG implementations for advanced data retrieval.",
    tech: ["React", "Next.js", "Tailwind CSS", "AI Integration"],
   
  }
];

export default function Portfolio() {
  /* State to track which project card is expanded */
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleProject = (projectId) => {
    if (expandedProjectId === projectId) {
      /* If clicking the already expanded card, collapse it */
      setExpandedProjectId(null);
    } else {
      /* Expand the clicked card */
      setExpandedProjectId(projectId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <BinaryRain />
        </div>

      {/* Top section (Personal Introduction) */}
      <section className="h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-6">

        <div className="relative z-10 flex flex-col items-center">
          <ScrambleText text="Muhittin Ercüment" />

          <h2 className="text-2xl md:text-3xl text-green-300 font-semibold mb-6 tracking-wide">
            Full Stack AI Engineer
          </h2>
          <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-10 max-w-3xl text-center mx-auto">
            Computer Engineering student at Istinye University and Full Stack AI Engineer at DOF Robotics.
            I specialize in building intelligent web applications using modern frameworks and LLMs, alongside
            hands-on experience in robotics, ROS2, and embedded systems.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a
              href="mailto:muhittinercument.1@gmail.com"
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors shadow-sm"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-green-400 text-xs tracking-[0.3em] uppercase opacity-70">scroll to see my works</span>
          <svg
            className="w-5 h-5 text-green-400 animate-bounce opacity-70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Projects section (Horizontal List with Expansion) */}
      <section id="projects" className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 text-green-300 text-center">
            Selected Projects
          </h3>
          
          {/* Vertical stack container */}
          <div className="flex flex-col gap-6">
            {projects.map((project) => {
              const isExpanded = expandedProjectId === project.id;

              return (
                <div key={project.id} className="w-full">

                  {/* Card header — always visible, centered */}
                  <div
                    className={`cursor-pointer p-8 text-center transition-all duration-300 ${
                      isExpanded
                        ? "bg-green-950/40 border-2 border-green-500 border-b-0 rounded-t-xl"
                        : "bg-green-950/20 border-2 border-green-900 hover:border-green-700 rounded-xl"
                    }`}
                    onClick={() => toggleProject(project.id)}
                  >
                    <span className="text-5xl block mb-4">{project.icon}</span>
                    <h4 className="text-2xl font-bold text-green-300 mb-3">{project.title}</h4>
                    <p className="text-green-300 leading-relaxed mb-5 max-w-2xl mx-auto">{project.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-5">
                      {project.tech.map((techItem, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-green-900/40 text-green-300 text-s px-3 py-1.5 rounded-md font-semibold tracking-wide "
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                    {project.hasLiveDemo && (
                      <div className={`text-xs font-bold tracking-widest transition-all duration-300 ${
                        isExpanded ? "text-green-300" : "text-green-300 animate-pulse"
                      }`}>
                        {isExpanded ? "▲ COLLAPSE DEMO" : "▼ CLICK TO EXPAND DEMO"}
                      </div>
                    )}
                  </div>

                  {/* Expandable demo panel — slides open below */}
                  {project.hasLiveDemo && (
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-2 border-t-0 border-green-500 bg-green-950/40 rounded-b-xl p-6 flex justify-center">
                          <div className="w-full  bg-black/60 p-4  shadow-xl">
                            {project.demoComponent === "sales" ? <SalesAgentDemo /> : <PortfolioAgentDemo />}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black  py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-green-300 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Muhittin Ercüment. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}