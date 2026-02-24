import React, { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Barlow:wght@300;400;500;600;700;900&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080b0f; font-family: 'Barlow', sans-serif; color: #e2e8f0; overflow-x: hidden; }
  .slide-in { animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .pulse-blue { animation: pulseBlue 2s ease-in-out infinite; }
  @keyframes pulseBlue { 0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); } 50% { box-shadow: 0 0 15px 0 rgba(59,130,246,0.2); } }
`;

function DirectorsCanvas() {
  const [model, setModel] = useState("KLING 1.5");
  const [aspect, setAspect] = useState("16:9");
  const [prompt, setPrompt] = useState("");
  const [camera, setCamera] = useState("STATIONARY");
  const [isCopying, setIsCopying] = useState(false);

  const copyPrompt = () => {
    const fullPrompt = `[MODEL: ${model}] [ASPECT: ${aspect}] [CAMERA: ${camera}] --prompt: ${prompt}`;
    navigator.clipboard.writeText(fullPrompt);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "flex-start", background: "radial-gradient(circle at 50% 0%, #111827 0%, #080b0f 100%)" }}>
      <style>{FONTS}</style>
      <style>{css}</style>
      
      <div className="slide-in" style={{ width: "100%", maxWidth: "500px", background: "#0d1117", border: "1px solid #1a2332", borderRadius: "24px", padding: "32px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 48, letterSpacing: 4, color: "#fff", marginBottom: 4 }}>DIRECTOR'S CANVAS</h1>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3b82f6", letterSpacing: 3 }}>STORYBOARD ENGINE v1.5</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 10, fontWeight: 800, color: "#475569", marginBottom: 8, display: "block" }}>MODEL ENGINE</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "100%", background: "#161b22", border: "1px solid #30363d", color: "#fff", padding: "12px", borderRadius: 12 }}>
            <option>KLING 1.5</option>
            <option>RUNWAY GEN-3</option>
            <option>LUMA DREAM</option>
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 10, fontWeight: 800, color: "#475569", marginBottom: 8, display: "block" }}>SCENE DESCRIPTION</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: "100%", height: 120, background: "#080b0f", border: "1px solid #1a2332", borderRadius: 16, padding: 18, color: "#fff" }}
          />
        </div>

        <button 
          onClick={copyPrompt}
          style={{ width: "100%", padding: "20px", background: isCopying ? "#10b981" : "#1d4ed8", border: "none", borderRadius: 16, color: "#fff", fontWeight: 800, cursor: "pointer" }}
        >
          {isCopying ? "✓ PROMPT READY" : "GENERATE MANIFESTO"}
        </button>
      </div>
    </div>
  );
}

export default DirectorsCanvas;
