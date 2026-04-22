import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { G, GD, GOLD } from "../../constants/theme";

function Header({ nav, currentPage, onNavigate, onLogout }) {
  const [mob, setMob] = useState(false);
  const [dd, setDd] = useState(null);
  const [mobSub, setMobSub] = useState(null);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("role") === "ADMIN";

  const btnStyle = (active) => ({
    background: "none", border: "none",
    color: active ? GOLD : "rgba(255,255,255,0.9)",
    padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: 14, fontWeight: "500",
  });

  const handleNavClick = (pageId) => {
    setMob(false); setDd(null); setMobSub(null);
    onNavigate(pageId);
  };

  const subBtnStyleDesktop = {
    display: "block", width: "100%", padding: "11px 18px",
    background: "none", border: "none", borderBottom: "0.5px solid #eee",
    cursor: "pointer", textAlign: "left", fontSize: 14, color: "#222",
  };
  const subBtnStyleMobile = {
    width: "100%", background: "none", border: "none",
    color: "rgba(255,255,255,0.75)", padding: "11px 20px 11px 36px",
    textAlign: "left", cursor: "pointer", fontSize: 14, display: "block",
    borderBottom: "0.5px solid rgba(255,255,255,0.05)",
  };

  return (
    <header style={{ background: G, position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div onClick={() => window.location.reload()} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: GOLD, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: G, letterSpacing: -0.5 }}>NAC</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div>
                <div style={{ color: "white", fontWeight: "bold", fontSize: 17, lineHeight: 1.1 }}>NAC KOREA</div>
                <div style={{ color: GOLD, fontSize: 9, letterSpacing: 2 }}>FEED ADDITIVES</div>
              </div>
            </div>
          </div>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="dsk">
          {nav.map(item => (
            <div key={item.id} style={{ position: "relative" }}
              onMouseEnter={() => item.sub && setDd(item.id)}
              onMouseLeave={() => setDd(null)}>
              {item.sub ? (
                <>
                  <button style={btnStyle(false)}>{item.label} <ChevronDown size={13} style={{ display: "inline", verticalAlign: "middle" }} /></button>
                  {dd === item.id && (
                    <div style={{ position: "absolute", top: "100%", left: 0, background: "white", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: 170, zIndex: 200, overflow: "hidden" }}>
                      {item.sub.map(s => (
                        s.id === "logout"
                          ? <button key={s.id} onClick={onLogout} style={subBtnStyleDesktop}
                              onMouseEnter={e => e.target.style.background = "#f0f7ec"}
                              onMouseLeave={e => e.target.style.background = "none"}>{s.label}</button>
                          : <button key={s.id} onClick={() => handleNavClick(s.id)} style={subBtnStyleDesktop}
                              onMouseEnter={e => e.target.style.background = "#f0f7ec"}
                              onMouseLeave={e => e.target.style.background = "none"}>{s.label}</button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button onClick={() => handleNavClick(item.id)} style={btnStyle(currentPage === item.id)}>{item.label}</button>
              )}
            </div>
          ))}
          {isAdmin && (
            <span style={{ background: "#d4880a", color: "#fff", fontWeight: "bold", fontSize: 11, borderRadius: 6, padding: "2px 10px", marginLeft: 14, letterSpacing: 1, display: "inline-block" }}>ADMIN</span>
          )}
        </nav>
        <button onClick={() => setMob(!mob)} className="ham"
          style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: 8, display: "flex", alignItems: "center" }}>
          {mob ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mob && (
        <div style={{ background: GD, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {nav.map(item => (
            <div key={item.id}>
              {item.sub ? (
                <>
                  <button onClick={() => setMobSub(mobSub === item.id ? null : item.id)}
                    style={{ width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.9)", padding: "14px 20px", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                    {item.label}
                    <ChevronDown size={15} style={{ transform: mobSub === item.id ? "rotate(180deg)" : "none", transition: "0.2s" }} />
                  </button>
                  {mobSub === item.id && (
                    <div style={{ background: "rgba(0,0,0,0.18)" }}>
                      {item.sub.map(s => (
                        s.id === "logout"
                          ? <button key={s.id} onClick={onLogout} style={subBtnStyleMobile}>{s.label}</button>
                          : <button key={s.id} onClick={() => handleNavClick(s.id)} style={subBtnStyleMobile}>{s.label}</button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button onClick={() => handleNavClick(item.id)}
                  style={{ width: "100%", background: "none", border: "none", color: currentPage === item.id ? GOLD : "rgba(255,255,255,0.9)", padding: "14px 20px", textAlign: "left", cursor: "pointer", fontSize: 15, borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                  {item.label}
                </button>
              )}
            </div>
          ))}
          {isAdmin && (
            <div style={{ padding: "10px 20px" }}>
              <span style={{ background: "#d4880a", color: "#fff", fontWeight: "bold", fontSize: 11, borderRadius: 6, padding: "2px 10px", letterSpacing: 1, display: "inline-block" }}>ADMIN</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
