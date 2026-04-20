import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { G, GL, GD, GOLD, BG, API_BASE } from "./constants/theme";
import { products } from "./constants/products";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

// JWT payload의 exp 필드로 토큰 만료 여부 검사
// 만료됐거나 형식이 잘못된 토큰은 false 반환
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // exp는 초 단위 Unix timestamp
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// localStorage의 토큰을 검사하고, 만료된 경우 즉시 제거 후 null 반환
function getValidToken() {
  const t = localStorage.getItem("token");
  if (isTokenValid(t)) return t;
  // 만료 토큰 제거
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  return null;
}

// Header는 자체 메뉴 상태(mob/dd/mobSub)를 소유 — App 리렌더와 독립적으로 동작
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

  // 메뉴 닫고 이동
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
          <div onClick={() => handleNavClick("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
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

function App() {
  const [page, setPage] = useState("home");
  // 로그인 상태 및 토큰 관리
  // getValidToken: 만료된 토큰은 localStorage에서 제거하고 null 반환
  const [token, setToken] = useState(() => getValidToken() ?? "");
  const [isLogin, setIsLogin] = useState(() => !!getValidToken());

  const go = (p) => setPage(p);

  // Pull-to-refresh
  const PULL_THRESHOLD = 80;
  const isPulling = useRef(false);
  const touchStartY = useRef(0);
  const pullYRef = useRef(0);
  const [pullProgress, setPullProgress] = useState(0); // 0~1

  useEffect(() => {
    // iOS Safari는 서브픽셀 렌더링으로 최상단에서도 scrollY가 0.5 등 양수를 반환할 수 있음
    // window.scrollY, pageYOffset, scrollingElement.scrollTop 순으로 fallback
    const getScrollTop = () => {
      if (typeof window.scrollY === "number") return window.scrollY;
      if (typeof window.pageYOffset === "number") return window.pageYOffset;
      return (document.documentElement.scrollTop || document.body.scrollTop || 0);
    };

    const onTouchStart = (e) => {
      // 스크롤 위치와 무관하게 항상 시작 좌표 기록
      // (스크롤 위치 판단은 touchmove에서 동적으로 수행)
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = false;
      pullYRef.current = 0;
    };

    const onTouchMove = (e) => {
      const scrollTop = getScrollTop();
      const delta = e.touches[0].clientY - touchStartY.current;

      if (scrollTop <= 1 && delta > 0) {
        // 최상단(서브픽셀 오차 1px 허용)에서 아래로 드래그 → PTR 활성화
        e.preventDefault(); // iOS 러버밴드 / 네이티브 PTR 차단
        isPulling.current = true;
        pullYRef.current = delta;
        setPullProgress(Math.min(delta / PULL_THRESHOLD, 1));
      } else if (isPulling.current) {
        if (delta <= 0) {
          // 위로 되돌아가면 PTR 취소
          isPulling.current = false;
          pullYRef.current = 0;
          setPullProgress(0);
        } else {
          // 계속 아래로 드래그 중 — 반드시 preventDefault 유지
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

    // touchstart: passive:true — 클릭 응답성 유지 (여기선 preventDefault 불필요)
    // touchmove: passive:false — e.preventDefault()로 iOS 스크롤/러버밴드 차단 필수
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // 로그인 성공 콜백 — LoginPage에서 호출
  const onLoginSuccess = (accessToken, role) => {
    const cleanToken = accessToken?.trim() ?? "";
    localStorage.setItem("token", cleanToken);
    localStorage.setItem("role", role);
    setToken(cleanToken);
    setIsLogin(true);
    go("home");
  };

  // 동적 네비게이션
  const nav = [
    // { id: "home", label: "홈" },
    { id: "co", label: "회사소개", sub: [{ id: "company", label: "회사소개" }, { id: "location", label: "회사위치" }] },
    { id: "pr", label: "제품소개", sub: [{ id: "pig", label: "🐷 돼지 제품" }, { id: "cattle", label: "🐄 소 제품" }, { id: "chicken", label: "🐔 닭 제품" }] },
    isLogin
      ? { id: "member", label: "회원", sub: [
          { id: "profile", label: "회원정보수정" },
          { id: "logout", label: "로그아웃" }
        ] }
      : { id: "member", label: "회원", sub: [
          { id: "login", label: "로그인" },
          { id: "register", label: "회원가입" }
        ] },
  ];

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (!token) {
      // 토큰이 없으면 바로 상태 초기화
      localStorage.removeItem("token");
      setToken("");
      setIsLogin(false);
      go("login");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/api/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken("");
        setIsLogin(false);
        go("login");
      } else {
        alert('로그아웃 실패: 서버 응답 오류');
      }
    } catch (e) {
      alert('로그아웃 실패: 네트워크 오류');
      console.error("로그아웃 실패:", e);
    }
  };



  const HomePage = () => (
    <div>
      <div style={{ background:`linear-gradient(160deg,${G} 0%,${GL} 60%,#2a8c45 100%)`, color:"white", padding:"90px 20px 80px", textAlign:"center" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div style={{ fontSize:52, marginBottom:16 }}>🌿</div>
          <h1 style={{ fontSize:"clamp(26px,5vw,50px)", fontWeight:"bold", marginBottom:14, lineHeight:1.2 }}>건강한 축산업의 시작,<br/>NAC KOREA</h1>
          <p style={{ fontSize:"clamp(14px,2vw,18px)", opacity:0.88, marginBottom:36, lineHeight:1.7 }}>
            과학적으로 검증된 사료 첨가제로 여러분의 축산 경쟁력을 높여드립니다.<br/>
            건강하고 생산성 높은 축산업을 함께 만들어갑니다.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => go("pig")} style={{ background:GOLD, border:"none", color:"white", padding:"13px 28px", borderRadius:8, fontSize:15, fontWeight:"bold", cursor:"pointer" }}>제품 보러가기</button>
            <button onClick={() => go("company")} style={{ background:"transparent", border:"2px solid rgba(255,255,255,0.7)", color:"white", padding:"13px 28px", borderRadius:8, fontSize:15, fontWeight:"bold", cursor:"pointer" }}>회사소개</button>
          </div>
        </div>
      </div>

      <div style={{ background:"white", padding:"64px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ textAlign:"center", fontSize:28, color:G, marginBottom:6, fontWeight:"bold" }}>NAC KOREA만의 강점</h2>
          <p style={{ textAlign:"center", color:"#777", marginBottom:44, fontSize:15 }}>과학과 자연이 만난 최고의 사료 첨가제</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:20 }}>
            {[["🔬","과학적 검증","국내외 연구기관과 협력, 엄격히 검증된 제품만 공급합니다"],
              ["🌿","천연 원료","안전한 천연 원료 사용으로 항생제 사용을 최소화합니다"],
              ["📈","생산성 향상","사료 효율 개선과 성장 촉진으로 수익성을 높여드립니다"],
              ["🏆","품질 인증","ISO 9001·GMP 인증으로 일관된 최고 품질을 보장합니다"]
            ].map(([ic,t,d],i) => (
              <div key={i} style={{ background:BG, borderRadius:12, padding:26, textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>{ic}</div>
                <h3 style={{ color:G, fontWeight:"bold", fontSize:16, marginBottom:8 }}>{t}</h3>
                <p style={{ color:"#666", fontSize:13, lineHeight:1.65 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:BG, padding:"64px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ textAlign:"center", fontSize:28, color:G, marginBottom:6, fontWeight:"bold" }}>제품 카테고리</h2>
          <p style={{ textAlign:"center", color:"#777", marginBottom:44, fontSize:15 }}>축종별 맞춤형 사료 첨가제 솔루션</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:22 }}>
            {[{ ic:"🐷", t:"돼지 전용", d:"성장 촉진부터 육질 개선까지 돼지 전용 사료 첨가제", p:"pig", bg:"#fff4ed", bdr:"#c0570a" },
              { ic:"🐄", t:"소 전용", d:"한우 마블링 향상부터 착유량 증진까지 소 전용 첨가제", p:"cattle", bg:"#f7f0ec", bdr:"#6d3a1f" },
              { ic:"🐔", t:"닭 전용", d:"육계·산란계 모두를 위한 닭 전용 생산성 향상 첨가제", p:"chicken", bg:"#fff8ec", bdr:"#b54500" },
            ].map((c,i) => (
              <div key={i} onClick={() => go(c.p)}
                style={{ background:c.bg, border:`2px solid ${c.bdr}33`, borderRadius:16, padding:30, cursor:"pointer", textAlign:"center", transition:"transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${c.bdr}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ fontSize:56, marginBottom:14 }}>{c.ic}</div>
                <h3 style={{ fontSize:20, fontWeight:"bold", color:"#222", marginBottom:8 }}>{c.t}</h3>
                <p style={{ color:"#666", fontSize:13, lineHeight:1.65, marginBottom:18 }}>{c.d}</p>
                <span style={{ background:c.bdr, color:"white", padding:"7px 18px", borderRadius:20, fontSize:13, fontWeight:"bold" }}>제품 보기 →</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:G, padding:"56px 20px", textAlign:"center", color:"white" }}>
        <h2 style={{ fontSize:26, fontWeight:"bold", marginBottom:12 }}>지금 바로 문의하세요</h2>
        <p style={{ opacity:0.85, marginBottom:28, fontSize:15 }}>전문 상담사가 귀 농장에 맞는 최적의 제품을 추천해 드립니다</p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          {[["📞","02-1234-5678"],["✉️","info@nac-korea.com"]].map(([ic,t]) => (
            <div key={t} style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", padding:"11px 22px", borderRadius:8, fontSize:14 }}>{ic} {t}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompanyPage = () => (
    <div style={{ maxWidth:920, margin:"0 auto", padding:"60px 20px" }}>
      <h1 style={{ fontSize:34, color:G, fontWeight:"bold", marginBottom:6 }}>회사소개</h1>
      <div style={{ width:56, height:4, background:GOLD, marginBottom:40, borderRadius:2 }}/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:40, marginBottom:56 }}>
        <div>
          <h2 style={{ fontSize:22, color:G, marginBottom:14, fontWeight:"bold" }}>회사 개요</h2>
          <p style={{ color:"#555", lineHeight:1.85, marginBottom:14 }}>NAC KOREA는 2010년 설립된 사료 첨가제 전문 기업으로, 축산업의 생산성 향상과 동물 복지 실현을 목표로 하고 있습니다.</p>
          <p style={{ color:"#555", lineHeight:1.85 }}>국내외 최고 연구기관과의 협력을 통해 개발된 제품들은 수많은 농가에서 그 효과를 인정받고 있으며, 건강하고 안전한 축산 환경 조성에 앞장서고 있습니다.</p>
        </div>
        <div style={{ background:BG, borderRadius:14, padding:28 }}>
          <h2 style={{ fontSize:18, color:G, marginBottom:18, fontWeight:"bold" }}>회사 정보</h2>
          {[["설립연도","2010년"],["대표이사","홍길동"],["사업 분야","사료 첨가제 제조·판매"],["임직원","50명"],["주요 인증","ISO 9001, GMP 인증"],["연간 매출","100억원+"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", paddingBottom:10, borderBottom:"0.5px solid #dde8d6", marginBottom:10 }}>
              <span style={{ color:"#888", width:90, flexShrink:0, fontSize:13 }}>{k}</span>
              <span style={{ color:"#333", fontWeight:"500", fontSize:13 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <h2 style={{ fontSize:22, color:G, marginBottom:20, fontWeight:"bold" }}>연혁</h2>
      <div style={{ borderLeft:`3px solid ${G}`, paddingLeft:24, marginBottom:48 }}>
        {[["2010","NAC KOREA 설립"],["2012","돼지 전용 사료 첨가제 첫 출시"],["2014","ISO 9001 인증 취득"],["2016","소·닭 제품 라인 확장"],["2018","GMP 인증 취득 및 수출 시작"],["2020","창립 10주년 — 연간 매출 100억 달성"],["2023","R&D 센터 확장 및 신제품 10종 출시"]].map(([y,t]) => (
          <div key={y} style={{ position:"relative", marginBottom:20 }}>
            <div style={{ position:"absolute", left:-31, top:4, width:14, height:14, borderRadius:"50%", background:GOLD, border:`2px solid ${G}` }}/>
            <span style={{ fontWeight:"bold", color:G, marginRight:14, fontSize:14 }}>{y}</span>
            <span style={{ color:"#555", fontSize:14 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const LocationPage = () => (
    <div style={{ maxWidth:920, margin:"0 auto", padding:"60px 20px" }}>
      <h1 style={{ fontSize:34, color:G, fontWeight:"bold", marginBottom:6 }}>회사위치</h1>
      <div style={{ width:56, height:4, background:GOLD, marginBottom:40, borderRadius:2 }}/>
      <div style={{ width:"100%", height:300, background:"#e2f0e2", borderRadius:14, marginBottom:36, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:`2px dashed #91c48a`, gap:10 }}>
        <MapPin size={44} color={G}/>
        <p style={{ color:G, fontWeight:"bold", fontSize:17 }}>Google Maps 연동 위치</p>
        <p style={{ color:"#888", fontSize:13 }}>경기도 성남시 분당구 판교역로 xxx</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:20 }}>
        {[{ icon:<MapPin size={18} color={G}/>, t:"본사 주소", c:"경기도 성남시 분당구\n판교역로 xxx\n판교 테크노밸리 xxx동 xxx호" },
          { icon:<Phone size={18} color={G}/>, t:"연락처", c:"대표전화: 02-1234-5678\n팩스: 02-1234-5679\n이메일: info@nac-korea.com\n업무시간: 평일 09:00~18:00" },
          { icon:<span style={{fontSize:16}}>🚌</span>, t:"교통편", c:"지하철: 신분당선 판교역 5번 출구 도보 10분\n버스: 판교역 정류장 하차\n자가용: 경부고속도로 판교IC 5분" },
        ].map((x,i) => (
          <div key={i} style={{ background:BG, borderRadius:12, padding:24 }}>
            <h3 style={{ color:G, fontWeight:"bold", fontSize:16, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>{x.icon} {x.t}</h3>
            <p style={{ color:"#555", lineHeight:1.85, fontSize:14, whiteSpace:"pre-line" }}>{x.c}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductPage = ({ type }) => {
    const d = products[type];
    return (
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"60px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:6 }}>
          <span style={{ fontSize:44 }}>{d.icon}</span>
          <div>
            <h1 style={{ fontSize:32, color:G, fontWeight:"bold" }}>{d.title}</h1>
            <div style={{ width:56, height:4, background:GOLD, marginTop:8, borderRadius:2 }}/>
          </div>
        </div>
        <p style={{ color:"#777", marginTop:14, marginBottom:44, fontSize:15 }}>NAC KOREA의 {d.title}은 과학적으로 검증된 원료로 생산됩니다.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24, marginBottom:44 }}>
          {d.list.map((p,i) => (
            <div key={i} style={{ background:"white", border:"0.5px solid #e0e0e0", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ background:`${d.col}14`, borderBottom:`3px solid ${d.col}`, padding:"22px 22px 16px" }}>
                <div style={{ fontSize:11, color:d.col, fontWeight:"bold", letterSpacing:1, marginBottom:5 }}>{p.code}</div>
                <h3 style={{ fontSize:17, fontWeight:"bold", color:"#1a1a1a", lineHeight:1.3 }}>{p.name}</h3>
              </div>
              <div style={{ padding:22 }}>
                <p style={{ color:"#666", fontSize:13, lineHeight:1.7, marginBottom:18 }}>{p.desc}</p>
                <div style={{ fontSize:11, color:"#999", fontWeight:"bold", marginBottom:9, letterSpacing:0.5 }}>주요 효과</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
                  {p.tags.map((tg,j) => (
                    <span key={j} style={{ background:`${d.col}18`, color:d.col, padding:"4px 10px", borderRadius:12, fontSize:12, fontWeight:"500" }}>{tg}</span>
                  ))}
                </div>
                <div style={{ background:"#f8f8f8", borderRadius:7, padding:"9px 13px", fontSize:13, color:"#555" }}>
                  <strong>사용량:</strong> {p.use}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:G, borderRadius:14, padding:"28px 36px", color:"white", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <h3 style={{ fontSize:20, fontWeight:"bold", marginBottom:6 }}>제품 상담이 필요하신가요?</h3>
            <p style={{ opacity:0.85, fontSize:14 }}>전문 상담사가 귀 농장에 맞는 최적의 솔루션을 제안해드립니다</p>
          </div>
          <button onClick={() => go("register")} style={{ background:GOLD, border:"none", color:"white", padding:"12px 24px", borderRadius:8, fontSize:15, fontWeight:"bold", cursor:"pointer", whiteSpace:"nowrap" }}>문의하기 →</button>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    if (page==="company") return <CompanyPage/>;
    if (page==="location") return <LocationPage/>;
    if (["pig","cattle","chicken"].includes(page)) return <ProductPage type={page}/>;
    if (page==="register") return <RegisterPage onNavigate={go}/>;
    if (page==="login") return <LoginPage onLoginSuccess={onLoginSuccess} onNavigate={go} isLogin={isLogin}/>;
    if (page==="profile") return <ProfilePage/>;
    return <HomePage/>;
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
        @keyframes ptr-spin{to{transform:rotate(360deg)}}
      `}</style>
      {pullProgress > 0 && (
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:9999, display:"flex", justifyContent:"center", alignItems:"flex-start", transform:`translateY(${pullProgress * 60 - 44}px)`, pointerEvents:"none" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", border:`3px solid ${G}`, borderTopColor:"transparent", background:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.18)", opacity: pullProgress, animation: pullProgress >= 1 ? "ptr-spin 0.7s linear infinite" : "none", transform: pullProgress < 1 ? `rotate(${pullProgress * 270}deg)` : undefined }} />
        </div>
      )}
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:BG }}>
        <Header nav={nav} currentPage={page} onNavigate={go} onLogout={handleLogout}/>
        <main style={{ flex:1 }}>{renderPage()}</main>
        <footer style={{ background:"#111", color:"#aaa", padding:"40px 20px 28px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:28, marginBottom:28 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <div style={{ width:30, height:30, background:GOLD, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:10, color:G }}>NAC</div>
                  <span style={{ color:"white", fontWeight:"bold", fontSize:15 }}>NAC KOREA</span>
                </div>
                <p style={{ fontSize:12, lineHeight:1.75 }}>최고의 사료 첨가제로<br/>건강한 축산업을 만들어갑니다</p>
              </div>
           
            </div>
            <div style={{ borderTop:"0.5px solid #333", paddingTop:18, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
              <p style={{ fontSize:11 }}>© 2024 NAC KOREA. All rights reserved.</p>
              <p style={{ fontSize:11 }}>사업자등록번호: 123-45-67890</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
// 커밋 테스트
export default App;