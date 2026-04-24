"use client";
import React, { useState, useEffect, useRef } from "react";
import { Globe, Terminal, Mail, PhoneCall, Check, Loader2, Database, Zap } from "lucide-react";

/* Mock data for lead generation sequence */
const MOCK_LEAD = {
    company: "Quantum Dynamics",
    name: "Sarah Jenkins",
    title: "Chief Technology Officer",
    email: "s.jenkins@quantum-dyn.com",
    phone: "+1 (555) 019-8472"
};

/* STEP 1: Global Targeting */
function Step1View({ onAnimationDone }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onAnimationDone(), 800);
                    return 100;
                }
                return p + 4;
            });
        }, 80);
        return () => clearInterval(interval);
    }, [onAnimationDone]);

    return (
        <div style={{ ...S.pane, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
            <div style={S.radarContainer}>
                <div style={S.radarSweep} />
                <Globe size={32} color="#22c55e" style={{ position: "absolute", zIndex: 10 }} />
                {progress > 40 && <div style={{ ...S.radarDot, top: "20%", left: "30%" }} />}
                {progress > 70 && <div style={{ ...S.radarDot, top: "60%", left: "70%" }} />}
                {progress > 90 && <div style={{ ...S.radarDot, top: "40%", left: "50%", transform: "scale(1.5)", background: "#4ade80" }} />}
            </div>
            <p style={{ marginTop: 24, fontSize: 13, color: "#22c55e", fontFamily: "'DM Mono', monospace" }}>
                Scanning global corporate registries... {progress}%
            </p>
            {progress >= 100 && (
                <p style={{ marginTop: 8, fontSize: 12, color: "#4ade80", fontWeight: "bold" }}>
                    [TARGET LOCKED: High-value enterprise found]
                </p>
            )}
        </div>
    );
}

/* STEP 2: Scrape & Extract */
function Step2View({ onAnimationDone }) {
    const [logs, setLogs] = useState([]);
    const scrollRef = useRef(null);

    const sequence = [
        "> Penetrating public directories...",
        "> Bypass successful. Accessing employee graph.",
        `> MATCH: ${MOCK_LEAD.company}`,
        `> Extracting C-Level profiles...`,
        `> Found: ${MOCK_LEAD.name} (${MOCK_LEAD.title})`,
        "> Decrypting contact nodes...",
        `> Email acquired: ${MOCK_LEAD.email}`,
        `> Direct dial acquired: ${MOCK_LEAD.phone}`,
        "> Payload secured. Ready for outreach."
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                /* Ensure sequence element is not undefined before appending */
                if (sequence[i]) {
                    setLogs(prev => [...prev, sequence[i]]);
                }
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => onAnimationDone(), 1200);
            }
        }, 500);
        return () => clearInterval(interval);
        
    /* Disable exhaustive deps to prevent interval reset on parent re-render */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [logs]);

    return (
        <div ref={scrollRef} style={{ ...S.pane, maxHeight: 200, overflowY: "auto", scrollbarWidth: "none" }}>
            <div style={S.termBar}>
                <Terminal size={12} color="#22c55e" />
                <span style={S.termTitle}>extractor.sh</span>
            </div>
            <div style={S.codeBox}>
                {logs.map((log, index) => (
                    /* Safely check includes with optional chaining to prevent crash */
                    <div key={index} style={{ color: log?.includes("acquired") ? "#4ade80" : "#22c55e", marginBottom: 6, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                        {log}
                    </div>
                ))}
                {logs.length < sequence.length && <span style={S.cursor}>█</span>}
            </div>
        </div>
    );
}

/* STEP 3: Draft Personalized Email */
function Step3View({ onAnimationDone }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDone, setIsDone] = useState(false);
    
    const emailBody = `Subject: Scaling AI Infrastructure at ${MOCK_LEAD.company}\n\nHi ${MOCK_LEAD.name.split(" ")[0]},\n\nI noticed Quantum Dynamics is actively expanding its embedded systems division. Given your role as ${MOCK_LEAD.title}, I thought it would be highly relevant to connect. We have built an autonomous AI integration that reduces motor control latency by 40%.\n\nAre you open to a brief call next week to discuss?`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= emailBody.length) {
                clearInterval(interval);
                setIsDone(true);
                setTimeout(() => onAnimationDone(), 1500);
                return;
            }
            setDisplayedText(emailBody.slice(0, i + 1));
            i++;
        }, 20); // Fast typing speed
        return () => clearInterval(interval);
    }, [onAnimationDone, emailBody]);

    return (
        <div style={{ ...S.pane, display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, borderBottom: "1px solid #14532d", paddingBottom: 8 }}>
                <Mail size={14} color="#22c55e" />
                <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "'DM Mono', monospace" }}>LLM Draft: {MOCK_LEAD.email}</span>
            </div>
            <div style={{ flex: 1, whiteSpace: "pre-wrap", color: "#bbf7d0", fontSize: 11, fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
                {displayedText}
                {!isDone && <span style={S.cursor}>█</span>}
            </div>
            {isDone && (
                <div style={{ marginTop: 12, background: "#022c22", border: "1px solid #065f46", padding: 6, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Check size={12} color="#4ade80" />
                    <span style={{ fontSize: 10, color: "#4ade80", fontWeight: "bold" }}>EMAIL SENT SUCCESSFULLY</span>
                </div>
            )}
        </div>
    );
}

/* STEP 4: AI Voice Call Execution */
function Step4View() {
    const [status, setStatus] = useState("Dialing...");
    
    useEffect(() => {
        const t1 = setTimeout(() => setStatus("Ringing..."), 1000);
        const t2 = setTimeout(() => setStatus("Call Connected. AI Agent Speaking."), 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const isConnected = status.includes("Connected");

    return (
        <div style={{ ...S.pane, textAlign: "center", padding: "24px 16px" }}>
            <div style={{ fontSize: 12, color: "#22c55e", marginBottom: 16, fontFamily: "'DM Mono', monospace" }}>
                Target: {MOCK_LEAD.phone}
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 24, alignItems: "center" }}>
                <div style={{ ...S.avatarLarge, background: "#064e3b", border: "1px solid #059669" }}>
                    <Zap size={24} color="#4ade80" />
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                    {[0,1,2,3,4,5].map(i => (
                        <div key={i} style={{
                            width: 6, height: isConnected ? 24 : 4, background: "#22c55e", borderRadius: 2,
                            animation: isConnected ? `waveform 0.6s ease-in-out ${i * 0.1}s infinite alternate` : 'none',
                            transition: "height 0.3s ease"
                        }} />
                    ))}
                </div>
                <div style={{ ...S.avatarLarge, background: "#022c22", border: "1px solid #065f46" }}>
                    <PhoneCall size={20} color="#94a3b8" />
                </div>
            </div>
            
            <p style={{ fontSize: 13, fontWeight: "bold", color: isConnected ? "#4ade80" : "#fbbf24", fontFamily: "'DM Mono', monospace" }}>
                {status}
            </p>
            {isConnected && (
                <p style={{ fontSize: 10, color: "#22c55e", marginTop: 8, opacity: 0.8 }}>
                    "Hi Sarah, this is Alex from DOF. I'm calling about..."
                </p>
            )}
        </div>
    );
}

/* MAIN WRAPPER COMPONENT */
const STEP_META = {
    1: { icon: Globe, label: "Targeting" },
    2: { icon: Database, label: "Extraction" },
    3: { icon: Mail, label: "Drafting" },
    4: { icon: PhoneCall, label: "Execution" }
};

export default function SalesAgentDemo() {
    const [displayStep, setDisplayStep] = useState(1);
    const [stepDone, setStepDone] = useState({ 1: false, 2: false, 3: false, 4: false });

    const handleStepDone = (step) => {
        setStepDone(prev => ({ ...prev, [step]: true }));
    };

    /* Auto progress logic */
    useEffect(() => {
        if (displayStep === 1 && stepDone[1]) setDisplayStep(2);
        if (displayStep === 2 && stepDone[2]) setDisplayStep(3);
        if (displayStep === 3 && stepDone[3]) setDisplayStep(4);
    }, [displayStep, stepDone]);

    const meta = STEP_META[displayStep];
    const IconComponent = meta.icon;

    return (
        <div style={S.overlay}>
            <style>
                {`
                @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes radarSpin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
                @keyframes ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }
                @keyframes waveform { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1.2); } }
                `}
            </style>
            
            <div style={S.card}>
                <div style={S.hdr}>
                    <div style={S.hdrIcon}>
                        <IconComponent size={20} color="#4ade80" />
                    </div>
                    <div>
                        <p style={S.hdrTitle}>SDR Protocol Active</p>
                        <p style={S.hdrSub}>{meta.label} Phase</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} style={{
                            ...S.pill,
                            background: n < displayStep ? "#064e3b" : n === displayStep ? "#065f46" : "#022c22",
                            borderColor: n <= displayStep ? "#10b981" : "#064e3b",
                            color: n < displayStep ? "#a7f3d0" : n === displayStep ? "#34d399" : "#065f46",
                        }}>
                            {n < displayStep ? <Check size={10} strokeWidth={3} /> : n}
                        </div>
                    ))}
                </div>

                <div style={S.content}>
                    {displayStep === 1 && <Step1View onAnimationDone={() => handleStepDone(1)} />}
                    {displayStep === 2 && <Step2View onAnimationDone={() => handleStepDone(2)} />}
                    {displayStep === 3 && <Step3View onAnimationDone={() => handleStepDone(3)} />}
                    {displayStep === 4 && <Step4View />}
                </div>
            </div>
        </div>
    );
}

/* STYLES FOR MATRIX THEME */
const S = {
    overlay: { position: "relative", width: "100%", minHeight: "350px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", padding: "10px 0" },
    card: { width: "100%", maxWidth: "100%", background: "#000000", padding: "20px", boxShadow: "0 0 20px rgba(16, 185, 129, 0.15)" },
    hdr: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18 },
    hdrIcon: { width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: "#022c22", border: "1px solid #065f46", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" },
    hdrTitle: { margin: 0, fontSize: 14, fontWeight: "bold", color: "#4ade80", fontFamily: "'DM Mono', monospace" },
    hdrSub: { margin: "2px 0 0", fontSize: 11, color: "#22c55e", fontFamily: "'DM Mono', monospace" },
    pill: { flex: 1, borderRadius: 4, border: "1px solid", padding: "4px", fontSize: 10, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", height: 20 },
    content: { borderRadius: 8, border: "1px solid #064e3b", background: "#020617", overflow: "hidden", minHeight: 220 },
    pane: { padding: 16 },
    radarContainer: { position: "relative", width: 120, height: 120, borderRadius: "50%", border: "1px solid #065f46", background: "#022c22", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
    radarSweep: { position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%", transformOrigin: "0 0", background: "linear-gradient(45deg, rgba(34,197,94,0) 50%, rgba(34,197,94,0.4) 100%)", animation: "radarSpin 2s linear infinite" },
    radarDot: { position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #4ade80", zIndex: 5 },
    termBar: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #064e3b" },
    termTitle: { fontSize: 10, color: "#10b981", fontFamily: "'DM Mono', monospace" },
    codeBox: { background: "#000000", border: "1px solid #064e3b", borderRadius: 4, padding: "12px", minHeight: 60, wordBreak: "break-all" },
    cursor: { color: "#4ade80", animation: "cursorBlink 0.8s ease infinite" },
    avatarLarge: { width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)" }
};