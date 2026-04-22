import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { G, GOLD, API_BASE } from "./constants/theme";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import NackoreaisPage from "./pages/NackoreaisPage";
import LocationPage from "./pages/LocationPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function getValidToken() {
  const t = localStorage.getItem("token");
  if (isTokenValid(t)) return t;
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  return null;
}

function App() {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState(() => getValidToken() ?? "");
  const [isLogin, setIsLogin] = useState(() => !!getValidToken());

  const go = (p) => setPage(p);

  // Pull-to-refresh
  const PULL_THRESHOLD = 200;
  const isPulling = useRef(false);
  const touchStartY = useRef(0);
  const pullYRef = useRef(0);
  const [pullProgress, setPullProgress] = useState(0);

  useEffect(() => {
    const getScrollTop = () => {
      if (typeof window.scrollY === "number") return window.scrollY;
      if (typeof window.pageYOffset === "number") return window.pageYOffset;
      return (document.documentElement.scrollTop || document.body.scrollTop || 0);
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = false;
      pullYRef.current = 0;
    };

    const onTouchMove = (e) => {
      const scrollTop = getScrollTop();
      const delta = e.touches[0].clientY - touchStartY.current;
      if (scrollTop <= 1 && delta > 0) {
        e.preventDefault();
        isPulling.current = true;
        pullYRef.current = delta;
        setPullProgress(Math.min(delta / PULL_THRESHOLD, 1));
      } else if (isPulling.current) {
        if (delta <= 0) {
          isPulling.current = false;
          pullYRef.current = 0;
          setPullProgress(0);
        } else {
          e.preventDefault();
          pullYRef.current = delta;
          setPullProgress(Math.min(delta / PULL_THRESHOLD, 1));
        }
      }
    };

    const onTouchEnd = () => {
      if (isPulling.current && pullYRef.current >= PULL_THRESHOLD) {
        window.location.reload();
        return;
      }
      isPulling.current = false;
      pullYRef.current = 0;
      setPullProgress(0);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const onLoginSuccess = (accessToken, role) => {
    const cleanToken = accessToken?.trim() ?? "";
    localStorage.setItem("token", cleanToken);
    localStorage.setItem("role", role);
    setToken(cleanToken);
    setIsLogin(true);
    go("home");
  };

  const nav = [
    {
      id: "co", label: "회사소개", sub: [
        { id: "company", label: "회사소개" },
        { id: "nackorea", label: "nackorea는" },
        { id: "location", label: "회사위치" },
      ],
    },
    {
      id: "pr", label: "제품소개", sub: [
        { id: "pig", label: "🐷 돼지 제품" },
        { id: "cattle", label: "🐄 소 제품" },
        { id: "chicken", label: "🐔 닭 제품" },
      ],
    },
    isLogin
      ? { id: "member", label: "회원", sub: [{ id: "profile", label: "회원정보수정" }, { id: "logout", label: "로그아웃" }] }
      : { id: "member", label: "회원", sub: [{ id: "login", label: "로그인" }, { id: "register", label: "회원가입" }] },
  ];

  const handleLogout = async () => {
    if (!token) {
      localStorage.removeItem("token");
      setToken("");
      setIsLogin(false);
      go("login");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/api/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken("");
        setIsLogin(false);
        go("login");
      } else {
        alert("로그아웃 실패: 서버 응답 오류");
      }
    } catch (e) {
      alert("로그아웃 실패: 네트워크 오류");
      console.error("로그아웃 실패:", e);
    }
  };

  const renderPage = () => {
    if (page === "company") return <CompanyPage />;
    if (page === "nackorea") return <NackoreaisPage />;
    if (page === "location") return <LocationPage />;
    if (["pig", "cattle", "chicken"].includes(page)) return <ProductPage type={page} onNavigate={go} />;
    if (page === "register") return <RegisterPage onNavigate={go} />;
    if (page === "login") return <LoginPage onLoginSuccess={onLoginSuccess} onNavigate={go} isLogin={isLogin} />;
    if (page === "profile") return <ProfilePage />;
    return <HomePage onNavigate={go} />;
  };

  return (
    <>
      <style>{`
        html,body{overscroll-behavior-y:none;-webkit-overflow-scrolling:auto}
        *{margin:0;padding:0;box-sizing:border-box;font-family:'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif}
        .dsk{display:none!important}
        .ham{display:flex!important}
        @media(min-width:768px){.dsk{display:flex!important}.ham{display:none!important}}
        button:hover{opacity:0.88}
        input:focus{border-color:${G}!important;box-shadow:0 0 0 3px ${G}22!important}
        @keyframes ptr-orbit{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes ptr-counter{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}
      `}</style>
      {pullProgress > 0 && (
        <div style={{
          position: "fixed", top: 0, left: "50%", zIndex: 9999,
          transform: `translateX(-50%) translateY(${Math.min(pullProgress * 70 - 10, 60)}px)`,
          pointerEvents: "none",
          width: 64, height: 64,
          opacity: Math.min(pullProgress * 2, 1),
          animation: pullProgress >= 1 ? "ptr-orbit 1s linear infinite" : "none",
          rotate: pullProgress < 1 ? `${pullProgress * 270}deg` : undefined,
        }}>
          {["🐄", "🐔", "🐷"].map((icon, i) => {
            const angle = (i * 120 - 90) * (Math.PI / 180);
            const r = 22;
            const x = 32 + r * Math.cos(angle);
            const y = 32 + r * Math.sin(angle);
            return (
              <div key={i} style={{
                position: "absolute",
                left: x, top: y,
                transform: "translate(-50%,-50%)",
                fontSize: 18,
                filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.18))",
                animation: pullProgress >= 1 ? "ptr-counter 1s linear infinite" : "none",
              }}>
                {icon}
              </div>
            );
          })}
        </div>
      )}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f8f0" }}>
        <Header nav={nav} currentPage={page} onNavigate={go} onLogout={handleLogout} />
        <main style={{ flex: 1 }}>{renderPage()}</main>
        <footer style={{ background: "#111", color: "#aaa", padding: "40px 20px 28px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 28, marginBottom: 28 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, background: GOLD, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10, color: G }}>NAC</div>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>NAC KOREA</span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.75 }}>최고의 사료 첨가제로<br />건강한 축산업을 만들어갑니다</p>
              </div>
            </div>
            <div style={{ borderTop: "0.5px solid #333", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <p style={{ fontSize: 11 }}>© 2024 NAC KOREA. All rights reserved.</p>
              <p style={{ fontSize: 11 }}>사업자등록번호: 123-45-67890</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
