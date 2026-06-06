"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  console.log("force cache bust for princess theme v2");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, username, password });
    if (res?.error) {
      setError("Username atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(160deg, #fdf8f5 0%, #fce8ee 30%, #f0e4f3 60%, #fdf8f5 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative floating orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "10%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(212,132,154,0.12) 0%, transparent 70%)",
        borderRadius: "50%", animation: "float1 10s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(184,152,200,0.1) 0%, transparent 70%)",
        borderRadius: "50%", animation: "float2 12s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Petal decorations */}
      <div style={{
        position: "absolute", top: "20%", right: "25%",
        width: "14px", height: "14px",
        background: "#f8dce5",
        borderRadius: "50% 0 50% 50%",
        opacity: 0.4,
        animation: "float1 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "30%", left: "20%",
        width: "10px", height: "10px",
        background: "#efe4f5",
        borderRadius: "50% 0 50% 50%",
        opacity: 0.35,
        animation: "float2 9s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.03)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(15px) scale(0.97)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .login-btn:hover { background: linear-gradient(135deg, #b898c8, #d4849a) !important; transform: translateY(-2px) !important; box-shadow: 0 12px 32px rgba(212,132,154,0.35) !important; }
        .login-btn:active { transform: translateY(0) !important; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }
      `}</style>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "420px",
        margin: "20px",
        animation: "fadeUp 0.6s ease forwards",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(212,132,154,0.15)",
          borderRadius: "28px",
          padding: "44px 40px",
          boxShadow: "0 20px 60px rgba(180,130,150,0.12), 0 0 0 1px rgba(255,255,255,0.5) inset",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top gradient bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: "linear-gradient(90deg, transparent, #d4849a, #b898c8, transparent)",
            borderRadius: "28px 28px 0 0",
          }} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            {/* Logo icon */}
            <div style={{
              width: "68px", height: "68px",
              background: "linear-gradient(135deg, rgba(212,132,154,0.15), rgba(184,152,200,0.1))",
              border: "1px solid rgba(212,132,154,0.2)",
              borderRadius: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 18px",
              boxShadow: "0 4px 16px rgba(212,132,154,0.12)",
              fontSize: "28px",
            }}>
              🌸
            </div>

            <h1 style={{
              fontSize: "26px", fontWeight: 800, margin: "0 0 6px",
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#3d2c35",
              letterSpacing: "-0.5px",
            }}>
              Kopi <span style={{ background: "linear-gradient(135deg, #d4849a, #b898c8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nusantara</span>
            </h1>
            <p style={{ color: "#8a7080", fontSize: "13px", margin: 0, letterSpacing: "0.3px" }}>
              Admin Dashboard
            </p>
          </div>

          {/* Error box */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "14px", padding: "12px 16px",
              color: "#dc2626", fontSize: "13px", textAlign: "center",
              marginBottom: "22px",
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 600,
                color: "#8a7080", textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px",
              }}>Username</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusUser ? "#d4849a" : "#b8a0aa", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusUser(true)}
                  onBlur={() => setFocusUser(false)}
                  placeholder="Masukkan username"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(253,248,245,0.8)",
                    border: `1.5px solid ${focusUser ? "rgba(212,132,154,0.5)" : "rgba(212,132,154,0.15)"}`,
                    borderRadius: "14px",
                    padding: "13px 16px 13px 44px",
                    color: "#3d2c35", fontSize: "14px",
                    outline: "none",
                    boxShadow: focusUser ? "0 0 0 3px rgba(212,132,154,0.1)" : "none",
                    transition: "all 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 600,
                color: "#8a7080", textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px",
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusPass ? "#d4849a" : "#b8a0aa", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="Masukkan password"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(253,248,245,0.8)",
                    border: `1.5px solid ${focusPass ? "rgba(212,132,154,0.5)" : "rgba(212,132,154,0.15)"}`,
                    borderRadius: "14px",
                    padding: "13px 48px 13px 44px",
                    color: "#3d2c35", fontSize: "14px",
                    outline: "none",
                    boxShadow: focusPass ? "0 0 0 3px rgba(212,132,154,0.1)" : "none",
                    transition: "all 0.2s",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#b8a0aa", padding: "4px",
                  display: "flex", alignItems: "center",
                }}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn" style={{
              width: "100%", padding: "14px",
              background: "linear-gradient(135deg, #d4849a 0%, #b898c8 100%)",
              border: "none", borderRadius: "14px",
              color: "#fff", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              boxShadow: "0 6px 20px rgba(212,132,154,0.3)",
              transition: "all 0.3s ease",
              letterSpacing: "0.3px",
            }}>
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "22px", color: "#b8a0aa", fontSize: "12px" }}>
            © 2026 Kopi Nusantara • Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
