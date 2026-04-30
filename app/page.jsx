"use client";
import React, { useState } from "react";
import ScrambleText from "./companents/scramble";
import BinaryRain from "./companents/BinaryRain";
/* Import the interactive agent component */
import PortfolioAgentDemo from "./companents/hr_animation";
import SalesAgentDemo from "./companents/leads_animation.jsx";
import VideoSection from "./companents/video_section.jsx";
// Project data array
const projects = [
  {
    id: "hr_bot",
    title: "End-to-End AI HR Agent",
    // Fullstack solo project with scrapers, custom RAG, and MS Teams integration
    description: "Built entirely from scratch encompassing frontend, backend, database, and AI bots. Utilizes multi-layer scrapers to identify candidates, extracts their specific data to build personalized RAG agents, and conducts automated live interviews via Microsoft Teams.",
    tech: ["Next.js", "Python", "FastAPI", "Web Scraping", "RAG", "Microsoft Graph API"],
    hasLiveDemo: true,
    demoComponent: "hr",
  },
  {
    id: "leads",
    title: "AI Lead Generation Platform",
    // Automated outreach platform with email and voice capabilities
    description: "Automated platform for lead generation, qualifying prospects, and guiding them through the sales funnel autonomously. Features fully automated cold emailing and AI-driven cold calling capabilities.",
    tech: ["Next.js", "Apollo.io", "Microsoft Graph API", "AWS", "Voice AI"],
    hasLiveDemo: true,
    demoComponent: "sales",
  },
  {
    id: "dof_monitoring",
    title: "Monitoring Applications for DOF Products",
    // Global telemetry data handling and dashboard development
    description: "Built fast and sustainable monitoring applications for stakeholders ranging from managers to product owners. Engineered the backend and database architecture to handle massive amounts of real-time global telemetry data coming from machines worldwide.",
    tech: ["React", "Next.js", "Tailwind CSS", "Python", "AWS DynamoDB", "Database Architecture"],
  },
  {
    id: "naruva",
    title: "Naruva - Autonomous GuideBot",
    // Collaborative freelance project encompassing both AI software and robotics hardware
    description: "Collaborative robotics project where I develop both the artificial intelligence capabilities and physical hardware integration. Features Multimodal AI, ROS2, LiDAR integration, and low-level motor control for autonomous navigation.",
    tech: ["Multimodal AI", "ROS2", "LiDAR", "NVIDIA Jetson Orin NX", "ESP32", "Python"],
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
    <>
    <VideoSection/>
  
    <div className="min-h-screen bg-black text-green-300 font-mono">
    
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <BinaryRain />
        </div>

      {/* Top section (Personal Introduction) */}
      <section className="h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-6">
 
        <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-6xl md:text-9xl  mb-4 tracking-tight text-green-300">
          Who ami?
        </h1>

          <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-10 max-w-3xl text-center mx-auto">
           I'm a Full Stack AI Engineer who builds web apps that actually think. 
          </p>
          <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-10 max-w-3xl text-center mx-auto">
           I design and develop AI-integrated web applications end to end — frontend, backend, database, deployment. I don't hand off parts; I own the whole thing 
          </p>
          <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-10 max-w-3xl text-center mx-auto">
           I use AI tools daily — but deliberately. I know when to lean on them and when to think for myself. The goal isn't to automate everything; it's to build better, faster, without losing control.
          </p>
          <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-10 max-w-3xl text-center mx-auto">
          New framework? New model? New paradigm? I don't wait for a course — I read the docs, break things, and ship something. Adapting fast isn't a skill I learned; it's how I'm wired. 
          </p>
          <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-10 max-w-3xl text-center mx-auto">
           My curiosity doesn't stop at the browser. I explore robotics and artificial intelligence beyond the web — because the most interesting problems live at the edges of disciplines.
          </p>
          

          
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
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
                      <div className={`text-3xl font-bold tracking-widest transition-all duration-300 ${
                        isExpanded ? "text-green-300" : "text-white animate-pulse"
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
                            {isExpanded && (project.demoComponent === "sales" ? <SalesAgentDemo /> : <PortfolioAgentDemo />)}
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
      <div className="flex flex-wrap gap-6 items-center justify-center py-8">
            <a
              href="mailto:muhittinercument.1@gmail.com"
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors shadow-sm"
            >
              Email
            </a>
            <a
              href="https://github.com/mercumen"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors shadow-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/muhittinercument/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors shadow-sm"
            >
              LinkedIn
            </a>
          </div>
      {/* Footer */}
      <footer className="bg-black  py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-green-300 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Muhittin Ercüment. All rights reserved.</p>
        </div>
      </footer>

    </div>
      </>
  );
}