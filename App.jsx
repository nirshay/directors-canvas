import { useState, useCallback, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Barlow:wght@300;400;500;600;700;900&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080b0f; font-family: 'Barlow', sans-serif; color: #e2e8f0; }
  ::-webkit-scrollbar { width: 4px; } 
  ::-webkit-scrollbar-track { background: #0d1117; }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
  
  .slide-in { animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  
  .pulse-blue { animation: pulseBlue 2s ease-in-out infinite; }
  @keyframes pulseBlue { 0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); } 50% { box-shadow: 0 0 15px 0 rgba(59,130,246,0.2); } }
`;

export default function DirectorsCanvas() {
  const [model, setModel] = useState("KLING 1.5");
  const [mode, setMode] = useState("HIGH QUALITY");
  const [motion, setMotion] = useState(5);
  const [aspect, setAspect] = useState("16:9");
  const [prompt, setPrompt] = useState("");
  const [camera, setCamera] = useState("STATIONARY");
  const [isCopying, setIsCopying] = useState(false);

  const copyPrompt = () => {
    const fullPrompt = `[MODEL: ${model}] [MODE: ${mode}] [ASPECT: ${aspect}] [MOTION: ${motion}] [CAMERA: ${camera}] --prompt: ${prompt}`;
    navigator.clipboard.writeText(fullPrompt);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <style>{FONTS}</style>
      <style>{css}</style>
      
      <div style={{ width: "100%", maxWidth: "500px", background: "#0d1117", border: "1px solid #1a2332", borderRadius: "24px", padding: "30px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 30, textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 42, letterSpacing: 3, color: "#fff", marginBottom: 4 }}>DIRECTOR'S CANVAS</h1>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3b82f6", letterSpacing: 2 }}>STORYBOARD ENGINE v1.5</p>
        </div>

        {/* Quick Selectors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 25 }}>
          <div>
            <label style={{ fontSize: 9, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block", letterSpacing: 1 }}>ENGINE</label>
            <select value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "100%", background: "#161b22", border: "1px solid #30363d", color: "#fff", padding: "10px", borderRadius: 8, fontSize: 12 }}>
              <option>KLING 1.5</option>
              <option>RUNWAY GEN-3</option>
              <option>LUMA DREAM</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 9, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block", letterSpacing: 1 }}>ASPECT RATIO</label>
            <div style={{ display: "flex", gap: 4 }}>
              {["16:9", "9:16", "2.35:1"].map(r => (
                <button key={r} onClick={() => setAspect(r)} style={{ flex: 1, padding: "10px 4px", background: aspect === r ? "#1d4ed8" : "#161b22", border: "none", borderRadius: 8, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Prompt Input */}
        <div style={{ marginBottom: 25 }}>
          <label style={{ fontSize: 9, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block", letterSpacing: 1 }}>CORE PROMPT</label>
          <textarea 
            placeholder="Describe the cinematic scene..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: "100%", height: 120, background: "#080b0f", border: "1px solid #1a2332", borderRadius: 12, padding: 15, color: "#fff", fontSize: 14, lineHeight: 1.5, resize: "none" }}
          />
        </div>

        {/* Camera Control */}
        <div style={{ marginBottom: 30 }}>
          <label style={{ fontSize: 9, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block", letterSpacing: 1 }}>CAMERA MOVEMENT</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {["STATIONARY", "DOLLY IN", "PAN LEFT", "TILT UP", "CRANE DOWN", "ZOOM OUT"].map(c => (
              <button key={c} onClick={() => setCamera(c)} style={{ padding: "8px 4px", background: camera === c ? "#1d4ed8" : "#161b22", border: "none", borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer" }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={copyPrompt}
          className={isCopying ? "" : "pulse-blue"}
          style={{ width: "100%", padding: "18px", background: isCopying ? "#10b981" : "#1d4ed8", border: "none", borderRadius: 16, color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: 2, cursor: "pointer", transition: "0.3s" }}
        >
          {isCopying ? "✓ COPIED TO CLIPBOARD" : "DEPLOY PROMPT"}
        </button>
      </div>
    </div>
  );
}
