"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// Video text ranges and configurations
// Adjust start and end times according to your new video's length
const SNAP_POINTS = [
    { time: 0, start: 0, end: 2, text: "Muhittin Ercument", subtext: "", position: "center" },
    { time: 1, start: 2, end: 4, text: "Full Stack AI Engineer", subtext: "", position: "center" },
   { time: 1, start: 4, end: 6, text: "Code Is Poetry, AI Is the Pen, and I am the Architect.", subtext: "", position: "center" },
  
];

// Put your generated video path or URL here
const VIDEO_SRC = "/kafa_optimized.webm"; 

// Defines scroll sensitivity
const PIXELS_PER_SECOND = 600;

export default function ScrollVideoPlayer() {
    const videoRef = useRef(null);
    const videoSectionRef = useRef(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoDuration, setVideoDuration] = useState(8);
    const [activeSnapIndex, setActiveSnapIndex] = useState(-1);
    const [currentTime, setCurrentTime] = useState(0);

    // Refs for performance optimization
    const accumulatedRef = useRef(0);
    const rafRef = useRef(null);
    const targetTimeRef = useRef(0);
    const currentTimeRef = useRef(0);

    // DOM Elements refs
    const dotsRef = useRef([]);

    // Initialize video duration safely
    const initVideo = useCallback(() => {
        if (videoRef.current && videoRef.current.duration) {
            setVideoDuration(videoRef.current.duration);
            setIsVideoReady(true);
        }
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            initVideo();
        }
    }, [initVideo]);

    // Failsafe for cached videos where onLoadedMetadata might not fire
    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 1) {
            initVideo();
        }
    }, [initVideo]);

    // Find active overlay based on time ranges
    const getActiveSnap = useCallback((time) => {
        for (let i = 0; i < SNAP_POINTS.length; i++) {
            if (time >= SNAP_POINTS[i].start && time <= SNAP_POINTS[i].end) {
                return i;
            }
        }
        return -1;
    }, []);

    // Highly optimized smooth seek animation loop
    useEffect(() => {
        const tick = () => {
            const video = videoRef.current;
            if (!video || !isVideoReady) {
                rafRef.current = requestAnimationFrame(tick);
                return;
            }

            const target = targetTimeRef.current;
            const current = currentTimeRef.current;
            const diff = target - current;

            if (Math.abs(diff) > 0.01) {
                // Smooth transition using linear interpolation
                const next = current + diff * 0.15;
                currentTimeRef.current = next;
                video.currentTime = Math.max(0, Math.min(next, video.duration));
                setCurrentTime(next);

                // Direct DOM update for Navigation Dots
                dotsRef.current.forEach((dot, i) => {
                    if (!dot) return;
                    const snap = SNAP_POINTS[i];
                    if (next >= snap.time - 0.2) {
                        dot.classList.add("passed");
                    } else {
                        dot.classList.remove("passed");
                    }
                });

                // React state is ONLY updated when the text actually changes
                setActiveSnapIndex((prevIndex) => {
                    const nextIndex = getActiveSnap(next);
                    return prevIndex !== nextIndex ? nextIndex : prevIndex;
                });
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isVideoReady, getActiveSnap]);

    // Handle mouse wheel and touch scroll events
    useEffect(() => {
        const section = videoSectionRef.current;
        if (!section) return;

        const handleWheel = (e) => {
            const rect = section.getBoundingClientRect();
            const isInControlZone = rect.top <= 40 && rect.bottom >= window.innerHeight - 40;

            if (!isInControlZone) return;

            const delta = e.deltaY;
            const isAtStart = accumulatedRef.current <= 0.02;
            const isAtEnd = accumulatedRef.current >= videoDuration - 0.02;

            if ((delta < 0 && isAtStart) || (delta > 0 && isAtEnd)) {
                return;
            }

            if (Math.abs(rect.top) > 0.5) {
                window.scrollTo({ top: section.offsetTop, behavior: "auto" });
            }

            e.preventDefault();
            const timeDelta = delta / PIXELS_PER_SECOND;

            accumulatedRef.current = Math.max(
                0,
                Math.min(accumulatedRef.current + timeDelta, videoDuration)
            );

            targetTimeRef.current = accumulatedRef.current;
        };

        let touchStartY = 0;
        let lastTouchY = 0;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            lastTouchY = touchStartY;
        };

        const handleTouchMove = (e) => {
            const rect = section.getBoundingClientRect();
            const isInControlZone = rect.top <= 40 && rect.bottom >= window.innerHeight - 40;

            if (!isInControlZone) return;

            const touchY = e.touches[0].clientY;
            const delta = lastTouchY - touchY;
            lastTouchY = touchY;

            const isAtStart = accumulatedRef.current <= 0.02;
            const isAtEnd = accumulatedRef.current >= videoDuration - 0.02;

            if ((delta < 0 && isAtStart) || (delta > 0 && isAtEnd)) {
                return;
            }

            if (Math.abs(rect.top) > 0.5) {
                window.scrollTo({ top: section.offsetTop, behavior: "auto" });
            }

            e.preventDefault();

            const timeDelta = delta / PIXELS_PER_SECOND;
            accumulatedRef.current = Math.max(
                0,
                Math.min(accumulatedRef.current + timeDelta, videoDuration)
            );
            targetTimeRef.current = accumulatedRef.current;
        };

        section.addEventListener("wheel", handleWheel, { passive: false });
        section.addEventListener("touchstart", handleTouchStart, { passive: true });
        section.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            section.removeEventListener("wheel", handleWheel);
            section.removeEventListener("touchstart", handleTouchStart);
            section.removeEventListener("touchmove", handleTouchMove);
        };
    }, [videoDuration]);

    // Navigate directly to a specific time
    const goToTime = (time) => {
        accumulatedRef.current = time;
        targetTimeRef.current = time;
    };

    const activeSnap = activeSnapIndex >= 0 ? SNAP_POINTS[activeSnapIndex] : null;

    return (
        <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
            <style>{`
            @keyframes textIn {
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes lineIn {
                to { width: 70px; }
            }
            /* JS manipulated class for dots */
            .passed {
                border-color: rgba(76, 175, 80, 0.5) !important;
                background-color: rgba(76, 175, 80, 0.3) !important;
            }
        `}</style>

            <section
                ref={videoSectionRef}
                className="relative h-screen bg-black flex items-center justify-center overflow-hidden w-full m-0 p-0"
            >
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={VIDEO_SRC}
                    muted
                    playsInline
                    preload="auto"
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                        
                    }}
                />

                {/* Text Overlay */}
                {activeSnap && activeSnap.text && (
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-10 ${
                            activeSnap.position === 'left' ? 'left-[5%] text-left max-w-[500px] px-10' :
                            activeSnap.position === 'center' ? 'left-0 right-0 w-full text-center px-10 flex flex-col items-center' :
                            'right-[5%] text-right max-w-[500px] px-10'
                        }`}
                        key={activeSnapIndex}
                    >
                        <div className=" text-[clamp(2.8rem,6.2vw,7rem)] text-white tracking-[0.06em] leading-[1.05] opacity-0 translate-y-10 animate-[textIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ textShadow: "0 0 8px #fff, 0 0 20px #fff, 0 0 50px rgba(76,175,80,0.9)" }}>
                            {activeSnap.text}
                        </div>
                        {activeSnap.subtext && (
                            <div className="font-normal text-[clamp(1rem,2vw,1.45rem)] text-white/90 mt-2.5 tracking-[0.18em] uppercase opacity-0 translate-y-5 animate-[textIn_0.5s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]" style={{ textShadow: "0 0 6px #fff, 0 0 20px rgba(255,255,255,0.7)" }}>
                                {activeSnap.subtext}
                            </div>
                        )}
                        <div className={`w-0 h-0.5 bg-gradient-to-r from-[#4CAF50] to-[#69F0AE] mt-4 shadow-[0_0_20px_rgba(76,175,80,0.6)] animate-[lineIn_0.7s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] ${
                            activeSnap.position === 'center' ? 'mx-auto' :
                            activeSnap.position === 'right' ? 'ml-auto' : ''
                        }`} />
                    </div>
                )}

                {currentTime >= 0 && currentTime < 0.1 && (
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
                        <div className="text-green-300 text-5xl font-bold  tracking-[0.35em] uppercase  animate-pulse">
                            scroll
                        </div>
                    </div>
                )}

           
            </section>
            
          
        </div>
    );
}