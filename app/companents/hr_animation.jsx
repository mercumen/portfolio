"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Database, Bot, Video, Award, Check, Loader2, Terminal, User, Mail, Zap } from "lucide-react";

/* Configuration for predefined mock data and timing 
*/
const MOCK_CANDIDATE = {
    fullName: "Muhittin Ercüment",
    title: "Full Stack AI Engineer",
    company: "DOF Robotics",
    avatarInitial: "ME",
    skills: ["Next.js", "ROS2", "ElevenLabs API", "RAG"]
};

const MOCK_URLS = [
    "github.com/muhittin/naruva-autonomous",
    "linkedin.com/in/muhittin-ercument",
    "dof-robotics.com/internal-ai-tools",
    "teams.microsoft.com/webrtc-bot-logs"
];

/* Shared waiting component 
*/
function WaitingPulse({ label }) {
    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 14, padding: "36px 16px", minHeight: 140,
        }}>
            <div style={{ display: "flex", gap: 8 }}>
                {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: "linear-gradient(135deg, #9333ea, #c084fc)",
                        display: "inline-block",
                        animation: `dotBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                        boxShadow: "0 0 8px rgba(147, 51, 234, 0.3)",
                    }} />
                ))}
            </div>
            <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b7280" }}>
                {label}
            </p>
        </div>
    );
}

/* STEP 1: Scrape & Find
*/
function Step1View({ onAnimationDone }) {
    const [displayed, setDisplayed] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const scrollRef = useRef(null);
    const command = '> execute search --query "Full Stack AI Engineer" --location "Istanbul" --skills "ROS2, Next.js"';

    useEffect(() => {
        let i = 0;
        const t = setInterval(() => {
            if (i >= command.length) {
                clearInterval(t);
                setTypingDone(true);
                setTimeout(() => onAnimationDone(), 1500);
                return;
            }
            setDisplayed(command.slice(0, i + 1));
            i++;
        }, 30);
        return () => clearInterval(t);
    }, [onAnimationDone, command]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [displayed, typingDone]);

    return (
        <div ref={scrollRef} style={{ ...S.pane, maxHeight: 220, overflowY: "auto", scrollbarWidth: "none" }}>
            <div style={S.termBar}>
                <Terminal size={12} color="#6b7280" />
                <span style={S.termTitle}>scout-agent.sh</span>
            </div>
            <p style={{ ...S.dim, marginBottom: 8 }}>
                {"> Initiating global candidate search..."}
            </p>
            <div style={S.codeBox}>
                <span style={{ color: "#581c87", fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.7 }}>
                    {displayed}
                </span>
                {!typingDone && <span style={S.cursor}>█</span>}
                {typingDone && (
                    <div style={{ marginTop: 12, color: "#059669", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                        [SUCCESS] Perfect match identified. ID: #ME-2026
                    </div>
                )}
            </div>
        </div>
    );
}

/* STEP 2: Extract Data
*/
function Step2View({ onAnimationDone }) {
    const [visibleUrls, setVisibleUrls] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const logRef = useRef(null);

    useEffect(() => {
        MOCK_URLS.forEach((url, i) => {
            setTimeout(() => {
                setCurrentIdx(i);
                setVisibleUrls((p) => [...p, { url, state: "scanning" }]);
                setTimeout(() => {
                    setVisibleUrls((p) => p.map((u) => u.url === url ? { ...u, state: "found" } : u));
                    if (i === MOCK_URLS.length - 1) {
                        setTimeout(() => onAnimationDone(), 1000);
                    }
                }, 800);
            }, i * 1200);
        });
    }, [onAnimationDone]);

    useEffect(() => {
        logRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
    }, [visibleUrls]);

    return (
        <div style={{ ...S.pane, padding: 0 }}>
            <div style={S.browserBar}>
                <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
                </div>
                <div style={S.urlBar}>
                    <Database size={10} color="#94a3b8" />
                    <span style={S.urlText}>
                        {visibleUrls.length ? visibleUrls[visibleUrls.length - 1].url : "connecting..."}
                    </span>
                    {currentIdx < MOCK_URLS.length - 1 && <Loader2 size={10} color="#9333ea" className="animate-spin" />}
                </div>
            </div>
            <div style={S.statusTick}>
                <span style={S.radarDot} />
                <span style={{ color: "#7c3aed", fontWeight: 600, fontSize: 11, fontFamily: "'DM Mono', monospace" }}>
                    Extracting technical background...
                </span>
            </div>
            <div ref={logRef} style={S.logFeed}>
                {visibleUrls.map((entry, i) => (
                    <div key={i} style={{ ...S.logRow, animation: "logIn 0.2s ease both" }}>
                        <div style={{ color: entry.state === "found" ? "#10b981" : "#7c3aed", flexShrink: 0 }}>
                            {entry.state === "found" ? <Check size={12} /> : <Loader2 size={12} className="animate-spin" />}
                        </div>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: entry.state === "found" ? "#1e293b" : "#64748b", flex: 1 }}>
                            {entry.url}
                        </span>
                        {entry.state === "found" && <span style={S.matchBadge}>parsed</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* STEP 3: Build Custom Agent
*/
function Step3View({ onAnimationDone }) {
    const [tasks, setTasks] = useState([]);
    
    const steps = [
        "Initializing RAG architecture...",
        "Loading ElevenLabs voice profiles...",
        "Compiling technical assessment questions...",
        "Agent ready for deployment."
    ];

    useEffect(() => {
        steps.forEach((step, i) => {
            setTimeout(() => {
                setTasks(prev => [...prev, step]);
                if (i === steps.length - 1) {
                    setTimeout(() => onAnimationDone(), 1500);
                }
            }, i * 1000);
        });
    }, [onAnimationDone]);

    return (
        <div style={S.pane}>
            <p style={{ ...S.dim, marginBottom: 16 }}>
                Configuring AI Interviewer specific to candidate profile...
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {tasks.map((task, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, animation: "fadeUp 0.3s ease both" }}>
                        <div style={{ width: 24, height: 24, borderRadius: 6, background: i === steps.length - 1 ? "#ecfdf5" : "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {i === steps.length - 1 ? <Check size={12} color="#059669" /> : <Bot size={12} color="#9333ea" />}
                        </div>
                        <span style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>{task}</span>
                    </div>
                ))}
                {tasks.length < steps.length && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.5 }}>
                        <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Loader2 size={12} className="animate-spin" />
                        </div>
                        <span style={{ fontSize: 12, color: "#64748b" }}>Processing...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

/* STEP 4: Live Meeting
*/
function Step4View({ onAnimationDone }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onAnimationDone(), 800);
                    return 100;
                }
                return p + 2;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [onAnimationDone]);

    return (
        <div style={{ ...S.pane, textAlign: "center", padding: "32px 16px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 24, alignItems: "center" }}>
                <div style={S.avatarLarge}>
                    <Bot size={24} color="#ffffff" />
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                    {[0,1,2,3,4].map(i => (
                        <div key={i} style={{
                            width: 4, height: 16, background: "#9333ea", borderRadius: 2,
                            animation: `wave 1s ease-in-out ${i * 0.1}s infinite alternate`
                        }} />
                    ))}
                </div>
                <div style={{ ...S.avatarLarge, background: "linear-gradient(135deg, #10b981, #059669)" }}>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{MOCK_CANDIDATE.avatarInitial}</span>
                </div>
            </div>
            
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                Live MS Teams Integration Active
            </p>
            <p style={{ fontSize: 11, color: "#64748b", marginBottom: 20 }}>
                Evaluating system architecture knowledge & logic...
            </p>

            <div style={{ width: "100%", height: 6, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "#9333ea", transition: "width 0.1s linear" }} />
            </div>
        </div>
    );
}

/* STEP 5: Final Result (Hired)
*/
function Step5View() {
    return (
        <div style={{ ...S.pane, paddingBottom: 16 }}>
            <div style={{ 
                background: "#ecfdf5", border: "1px solid #a7f3d0", 
                borderRadius: 12, padding: "24px", textAlign: "center",
                animation: "fadeUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both"
            }}>
                <div style={{ 
                    width: 56, height: 56, background: "#10b981", borderRadius: "50%", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px", boxShadow: "0 8px 16px rgba(16, 185, 129, 0.2)"
                }}>
                    <Award size={28} color="#ffffff" />
                </div>
                <h3 style={{ margin: "0 0 4px", fontSize: 18, color: "#065f46", fontWeight: 800 }}>
                    CANDIDATE HIRED
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: "#047857" }}>
                    Exceptional technical proficiency confirmed.
                </p>
            </div>

            <div style={{ ...S.profCard, marginTop: 16, borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.03)" }}>
                <div style={{ ...S.av, background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 4px 10px rgba(16,185,129,0.2)" }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "white" }}>{MOCK_CANDIDATE.avatarInitial}</span>
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{MOCK_CANDIDATE.fullName}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>
                        {MOCK_CANDIDATE.title} · {MOCK_CANDIDATE.company}
                    </p>
                    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                        {MOCK_CANDIDATE.skills.map((skill, i) => (
                            <span key={i} style={{ fontSize: 9, background: "#d1fae5", color: "#065f46", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* MAIN WRAPPER COMPONENT
*/
const STEP_META = {
    1: { icon: Search, label: "Scraping" },
    2: { icon: Database, label: "Extracting" },
    3: { icon: Bot, label: "Training" },
    4: { icon: Video, label: "Interview" },
    5: { icon: Award, label: "Hired" }
};

export default function PortfolioAgentDemo() {
    const [displayStep, setDisplayStep] = useState(1);
    const [stepDone, setStepDone] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false });

    const handleStepDone = (step) => {
        setStepDone(prev => ({ ...prev, [step]: true }));
    };

    /* Automatically progress to next step when current step completes 
    */
    useEffect(() => {
        if (displayStep === 1 && stepDone[1]) setDisplayStep(2);
        if (displayStep === 2 && stepDone[2]) setDisplayStep(3);
        if (displayStep === 3 && stepDone[3]) setDisplayStep(4);
        if (displayStep === 4 && stepDone[4]) setDisplayStep(5);
    }, [displayStep, stepDone]);

    const meta = STEP_META[displayStep];
    const IconComponent = meta.icon;

    return (
        <div style={S.overlay}>
            <style>
                {`
                @keyframes dotBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes logIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes radar { 0% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4); } 100% { box-shadow: 0 0 0 10px rgba(147, 51, 234, 0); } }
                @keyframes wave { 0% { transform: scaleY(0.5); } 100% { transform: scaleY(1.5); } }
                `}
            </style>
            
            <div style={S.card}>
                <div style={S.hdr}>
                    <div style={S.hdrIcon}>
                        <IconComponent size={20} color="#9333ea" />
                    </div>
                    <div>
                        <p style={S.hdrTitle}>HR Agent Protocol</p>
                        <p style={S.hdrSub}>{meta.label} Phase Active</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} style={{
                            ...S.pill,
                            background: n < displayStep ? "#ecfdf5" : n === displayStep ? "#f3e8ff" : "#f8fafc",
                            borderColor: n < displayStep ? "#6ee7b7" : n === displayStep ? "#d8b4fe" : "#e2e8f0",
                            color: n < displayStep ? "#059669" : n === displayStep ? "#7c3aed" : "#94a3b8",
                        }}>
                            {n < displayStep ? <Check size={10} strokeWidth={3} /> : n}
                        </div>
                    ))}
                </div>

                <div style={S.content}>
                    {displayStep === 1 && <Step1View onAnimationDone={() => handleStepDone(1)} />}
                    {displayStep === 2 && <Step2View onAnimationDone={() => handleStepDone(2)} />}
                    {displayStep === 3 && <Step3View onAnimationDone={() => handleStepDone(3)} />}
                    {displayStep === 4 && <Step4View onAnimationDone={() => handleStepDone(4)} />}
                    {displayStep === 5 && <Step5View />}
                </div>
            </div>
        </div>
    );
}

/* INLINE STYLES 
*/
const S = {
    overlay: { position: "relative", width: "100%", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", padding: "20px 0" },
    card: { width: "100%", maxWidth: "100%", background: "#ffffff", border: "1.5px solid rgba(147, 51, 234, 0.15)", borderRadius: 20, padding: "24px", boxShadow: "0 10px 40px rgba(147, 51, 234, 0.08)" },
    hdr: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 },
    hdrIcon: { width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "#faf5ff", border: "1px solid #f3e8ff", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" },
    hdrTitle: { margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a2e" },
    hdrSub: { margin: "2px 0 0", fontSize: 12, color: "#6b7280" },
    pill: { flex: 1, borderRadius: 6, border: "1px solid", padding: "4px", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.35s ease", height: 24 },
    content: { borderRadius: 12, border: "1px solid rgba(147, 51, 234, 0.1)", background: "#fafafa", overflow: "hidden", minHeight: 220 },
    pane: { padding: 16 },
    termBar: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #e5e7eb" },
    termTitle: { fontSize: 10, color: "#6b7280", fontFamily: "'DM Mono', monospace" },
    dim: { margin: 0, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#64748b" },
    codeBox: { background: "#f5f3ff", border: "1px solid #ede9fe", borderRadius: 8, padding: "12px", minHeight: 60, wordBreak: "break-all" },
    cursor: { color: "#9333ea", animation: "cursorBlink 0.8s ease infinite" },
    browserBar: { display: "flex", alignItems: "center", gap: 10, background: "#f8fafc", padding: "10px 14px", borderBottom: "1px solid #e2e8f0" },
    urlBar: { flex: 1, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden" },
    urlText: { fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: "#64748b", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
    statusTick: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #f1f5f9" },
    radarDot: { width: 8, height: 8, borderRadius: "50%", background: "#9333ea", flexShrink: 0, display: "inline-block", animation: "radar 1.1s ease-out infinite" },
    logFeed: { padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6, height: 120, overflowY: "auto", scrollbarWidth: "none" },
    logRow: { display: "flex", alignItems: "center", gap: 8 },
    matchBadge: { fontSize: 9, fontWeight: 600, background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#059669", borderRadius: 4, padding: "2px 6px", flexShrink: 0 },
    profCard: { display: "flex", alignItems: "center", gap: 12, borderRadius: 10, border: "1px solid", padding: "12px" },
    av: { width: 44, height: 44, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
    avatarLarge: { width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #a855f7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(147, 51, 234, 0.2)" }
};