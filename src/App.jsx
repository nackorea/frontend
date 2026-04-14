import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import axios from "axios";

function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      if (onDone) onDone();
    }, 1000);
    return () => clearTimeout(t);
  }, [message, onDone]);
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 60, left: "50%", transform: "translateX(-50%)",
      background: "#222", color: "#fff", padding: "22px 60px", borderRadius: 14,
      fontSize: 18, zIndex: 9999, boxShadow: "0 4px 32px #0005", minWidth: 320, textAlign: "center", fontWeight: 600
    }}>
      {message}
    </div>
  );
}

function App() {
  // 회원정보수정(프로필) 페이지 더미
  const ProfilePage = () => (
    <div style={{ maxWidth:500, margin:"0 auto", padding:"60px 20px" }}>
      <h1 style={{ fontSize:30, color:G, fontWeight:"bold", marginBottom:6 }}>회원정보 수정</h1>
      <div style={{ width:56, height:4, background:GOLD, marginBottom:24, borderRadius:2 }}/>
      <div style={{ background:"white", borderRadius:16, padding:32, boxShadow:"0 2px 20px rgba(0,0,0,0.07)" }}>
        <p style={{ color:"#666", fontSize:15, textAlign:"center" }}>회원정보 수정 페이지 (구현 필요)</p>
      </div>
    </div>
  );
  const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(false);

    // 로그인 상태면 바로 홈으로 이동
    if (isLogin) {
      go("home");
      return null;
    }

    const handleChange = e => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async e => {
      e.preventDefault();
      setLoading(true);
      setToast("");
      console.log("로그인 시도:", form); // 디버그용 알림
      try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        console.log("권한:", data.member.role); // 디버그용 알림
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("role", data.member.role);
          setToken(data.accessToken);
          setIsLogin(true);
        }
        setToast("로그인 성공!");
      } catch (e) {
        console.error("로그인 실패:", e); // 디버그용 알림
        setToast("이메일 또는 비밀번호를 확인하세요.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{ maxWidth:400, margin:"0 auto", padding:"60px 20px" }}>
        <h1 style={{ fontSize:30, color:G, fontWeight:"bold", marginBottom:6 }}>로그인</h1>
        <div style={{ width:56, height:4, background:GOLD, marginBottom:24, borderRadius:2 }}/>
        <form onSubmit={handleLogin} style={{ background:"white", borderRadius:16, padding:32, boxShadow:"0 2px 20px rgba(0,0,0,0.07)" }}>
          <div style={{ marginBottom:22 }}>
            <label style={{ display:"block", fontWeight:"500", color:"#333", marginBottom:7, fontSize:14 }}>이메일</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width:"100%", padding:"11px 14px", border:`1.5px solid #ddd`, borderRadius:8, fontSize:15, outline:"none", background:"white", boxSizing:"border-box" }} />
          </div>
          <div style={{ marginBottom:22 }}>
            <label style={{ display:"block", fontWeight:"500", color:"#333", marginBottom:7, fontSize:14 }}>비밀번호</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required style={{ width:"100%", padding:"11px 14px", border:`1.5px solid #ddd`, borderRadius:8, fontSize:15, outline:"none", background:"white", boxSizing:"border-box" }} />
          </div>
          <button type="submit" disabled={loading} style={{ width:"100%", background:G, border:"none", color:"white", padding:"14px", borderRadius:8, fontSize:16, fontWeight:"bold", cursor:"pointer", opacity:loading?0.7:1 }}>로그인</button>
        </form>
        <Toast message={toast} onDone={() => {
          setToast("");
        }} />
      </div>
    );
  };


const G = "#1a5f30", GL = "#227a3e", GD = "#124522", GOLD = "#d4880a", BG = "#f3f8f0";
const products = {
  pig: {
    icon: "🐷", title: "돼지 전용 사료 첨가제", col: "#c0570a",
    list: [
      { name: "NAC-돈 프로바이오틱스 골드", code: "NAC-PG-001", desc: "장내 유익균 증식으로 소화율 향상 및 면역력 강화 전문 복합 사료 첨가제", tags: ["소화율 20%↑","FCR 개선","폐사율 감소","항생제 대체"], use: "사료 1톤당 500g" },
      { name: "NAC-돈 미네랄 콤플렉스", code: "NAC-PM-002", desc: "필수 미네랄 복합체로 성장 촉진 및 골격 형성을 최적화하는 첨가제", tags: ["성장 촉진","골격 강화","번식성적 향상","빈혈 예방"], use: "사료 1톤당 1kg" },
      { name: "NAC-돈 항산화 포뮬라", code: "NAC-PA-003", desc: "천연 항산화 성분으로 스트레스 감소 및 육질을 개선하는 프리미엄 제품", tags: ["스트레스 감소","육질 개선","항산화 효과","면역 증진"], use: "사료 1톤당 300g" },
    ]
  },
  cattle: {
    icon: "🐄", title: "소 전용 사료 첨가제", col: "#6d3a1f",
    list: [
      { name: "NAC-한우 프리미엄 플러스", code: "NAC-CP-001", desc: "한우 전용 고급 첨가제로 마블링 향상 및 육질 등급 개선에 탁월한 효과", tags: ["마블링 향상","육질 등급↑","성장률 향상","사료 이용률↑"], use: "사료 1톤당 800g" },
      { name: "NAC-젖소 밀크 부스터", code: "NAC-CM-002", desc: "착유량 증가 및 유질 개선을 위한 젖소 전용 특수 사료 첨가제", tags: ["착유량 15%↑","유지방 개선","체세포수 감소","번식성적↑"], use: "두당 일 50g" },
      { name: "NAC-소 루멘 액티브", code: "NAC-CR-003", desc: "반추위 기능 강화로 사료 이용률을 극대화하는 반추위 전용 첨가제", tags: ["반추위 활성화","가스 발생↓","체중 증가","소화 효율↑"], use: "사료 1톤당 600g" },
    ]
  },
  chicken: {
    icon: "🐔", title: "닭 전용 사료 첨가제", col: "#b54500",
    list: [
      { name: "NAC-브로일러 그로스 터보", code: "NAC-BP-001", desc: "육계 전용 초고속 성장 촉진 및 면역 강화 복합 사료 첨가제", tags: ["성장속도 25%↑","균일도 개선","면역 강화","출하일 단축"], use: "사료 1톤당 400g" },
      { name: "NAC-산란계 에그 슈퍼", code: "NAC-LE-002", desc: "산란율 향상 및 난각 강도 개선을 위한 산란계 전용 첨가제", tags: ["산란율 5%↑","난각 강도↑","난황색 개선","산란 연장"], use: "사료 1톤당 500g" },
      { name: "NAC-닭 인테스틴 케어", code: "NAC-IC-003", desc: "장 건강 증진으로 사료 효율 및 전체 생산성을 향상시키는 첨가제", tags: ["장 건강 개선","사료 효율↑","암모니아↓","폐사율 감소"], use: "사료 1톤당 300g" },
    ]
  }
};

  const [page, setPage] = useState("home");
  const [mob, setMob] = useState(false);
  const [dd, setDd] = useState(null);
  const [mobSub, setMobSub] = useState(null);
  // 로그인 상태 및 토큰 관리
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");

  const go = (p) => { setPage(p); setMob(false); setDd(null); setMobSub(null); };

  // 최초 진입 시 localStorage에서 토큰 확인
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      setIsLogin(true);
    } else {
      setToken("");
      setIsLogin(false);
    }
  }, []);

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
      const res = await axios.post("http://localhost:8080/api/auth/logout", {}, {
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



  const S = { btn: (active) => ({ background:"none", border:"none", color: active ? GOLD : "rgba(255,255,255,0.9)", padding:"8px 14px", borderRadius:6, cursor:"pointer", fontSize:14, fontWeight:"500" }) };

  const Header = () => {
    // role이 ADMIN이면 admin 뱃지 노출
    const isAdmin = typeof window !== "undefined" && localStorage.getItem("role") === "ADMIN";
    return (
      <header style={{ background:G, position:"sticky", top:0, zIndex:1000, boxShadow:"0 2px 8px rgba(0,0,0,0.25)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", flex:1 }}>
            <div onClick={() => go("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:38, height:38, background:GOLD, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12, color:G, letterSpacing:-0.5 }}>NAC</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div>
                  <div style={{ color:"white", fontWeight:"bold", fontSize:17, lineHeight:1.1 }}>NAC KOREA</div>
                  <div style={{ color:GOLD, fontSize:9, letterSpacing:2 }}>FEED ADDITIVES</div>
                </div>
              </div>
            </div>
          </div>
          <nav style={{ display:"flex", alignItems:"center", gap:4 }} className="dsk">
            {nav.map(item => (
              <div key={item.id} style={{ position:"relative" }}
                onMouseEnter={() => item.sub && setDd(item.id)}
                onMouseLeave={() => setDd(null)}>
                {item.sub ? (
                  <>
                    <button style={S.btn(false)}>{item.label} <ChevronDown size={13} style={{ display:"inline", verticalAlign:"middle" }}/></button>
                    {dd === item.id && (
                      <div style={{ position:"absolute", top:"100%", left:0, background:"white", borderRadius:8, boxShadow:"0 8px 24px rgba(0,0,0,0.15)", minWidth:170, zIndex:200, overflow:"hidden" }}>
                        {item.sub.map(s => (
                          s.id === "logout"
                            ? <button key={s.id} onClick={handleLogout}
                                style={{ display:"block", width:"100%", padding:"11px 18px", background:"none", border:"none", borderBottom:"0.5px solid #eee", cursor:"pointer", textAlign:"left", fontSize:14, color:"#222" }}
                                onMouseEnter={e => e.target.style.background="#f0f7ec"}
                                onMouseLeave={e => e.target.style.background="none"}>
                                {s.label}
                              </button>
                            : <button key={s.id} onClick={() => go(s.id)}
                                style={{ display:"block", width:"100%", padding:"11px 18px", background:"none", border:"none", borderBottom:"0.5px solid #eee", cursor:"pointer", textAlign:"left", fontSize:14, color:"#222" }}
                                onMouseEnter={e => e.target.style.background="#f0f7ec"}
                                onMouseLeave={e => e.target.style.background="none"}>
                                {s.label}
                              </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={() => go(item.id)} style={S.btn(page === item.id)}>{item.label}</button>
                )}
              </div>
            ))}
            {/* ADMIN 뱃지 우측 메뉴 옆에 노출 */}
            {isAdmin && (
              <span style={{
                background: "#d4880a",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 11,
                borderRadius: 6,
                padding: "2px 10px",
                marginLeft: 14,
                letterSpacing: 1,
                display: "inline-block"
              }}>ADMIN</span>
            )}
          </nav>
          <button onClick={() => setMob(!mob)} className="ham"
            style={{ background:"none", border:"none", color:"white", cursor:"pointer", padding:8, display:"flex", alignItems:"center" }}>
            {mob ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        {mob && (
          <div style={{ background:GD, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
            {nav.map(item => (
              <div key={item.id}>
                {item.sub ? (
                  <>
                    <button onClick={() => setMobSub(mobSub === item.id ? null : item.id)}
                      style={{ width:"100%", background:"none", border:"none", color:"rgba(255,255,255,0.9)", padding:"14px 20px", textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:15, borderBottom:"0.5px solid rgba(255,255,255,0.07)" }}>
                      {item.label}
                      <ChevronDown size={15} style={{ transform: mobSub===item.id?"rotate(180deg)":"none", transition:"0.2s" }}/>
                    </button>
                    {mobSub === item.id && (
                      <div style={{ background:"rgba(0,0,0,0.18)" }}>
                        {item.sub.map(s => (
                          s.id === "logout"
                            ? <button key={s.id} onClick={handleLogout}
                                style={{ width:"100%", background:"none", border:"none", color:"rgba(255,255,255,0.75)", padding:"11px 20px 11px 36px", textAlign:"left", cursor:"pointer", fontSize:14, display:"block", borderBottom:"0.5px solid rgba(255,255,255,0.05)" }}>
                                {s.label}
                              </button>
                            : <button key={s.id} onClick={() => go(s.id)}
                                style={{ width:"100%", background:"none", border:"none", color:"rgba(255,255,255,0.75)", padding:"11px 20px 11px 36px", textAlign:"left", cursor:"pointer", fontSize:14, display:"block", borderBottom:"0.5px solid rgba(255,255,255,0.05)" }}>
                                {s.label}
                              </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button onClick={() => go(item.id)}
                    style={{ width:"100%", background:"none", border:"none", color: page===item.id ? GOLD : "rgba(255,255,255,0.9)", padding:"14px 20px", textAlign:"left", cursor:"pointer", fontSize:15, borderBottom:"0.5px solid rgba(255,255,255,0.07)" }}>
                    {item.label}
                  </button>
                )}
              </div>
            ))}
            {/* 모바일 메뉴에서도 ADMIN 뱃지 노출 */}
            {isAdmin && (
              <div style={{ padding: "10px 20px 10px 20px" }}>
                <span style={{
                  background: "#d4880a",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 11,
                  borderRadius: 6,
                  padding: "2px 10px",
                  letterSpacing: 1,
                  display: "inline-block"
                }}>ADMIN</span>
              </div>
            )}
          </div>
        )}
      </header>
    );
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

  const RegisterPage = () => {
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", password2: "" });
    const [errs, setErrs] = useState({});
    const [done, setDone] = useState(false);

    const validate = () => {
      const e = {};
      if (!form.name.trim()) e.name = "이름을 입력해주세요";
      if (!form.phone.trim()) e.phone = "전화번호를 입력해주세요";
      else if (!/^[\d\-+\s]{9,15}$/.test(form.phone)) e.phone = "올바른 전화번호를 입력해주세요";
      if (!form.email.trim()) e.email = "이메일을 입력해주세요";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일을 입력해주세요";
      if (!form.password.trim()) e.password = "비밀번호를 입력해주세요";
      else if (form.password.length < 8) e.password = "비밀번호는 8자 이상이어야 합니다";
      if (!form.password2.trim()) e.password2 = "비밀번호 확인을 입력해주세요";
      else if (form.password2.length < 8) e.password2 = "비밀번호는 8자 이상이어야 합니다";
      else if (form.password !== form.password2) e.password2 = "비밀번호가 일치하지 않습니다";
      return e;
    };

    const submit = () => {
      const e = validate();
      if (Object.keys(e).length) { setErrs(e); return; }
      setDone(true);
    };

    return (
      <div style={{ maxWidth:500, margin:"0 auto", padding:"60px 20px" }}>
        <h1 style={{ fontSize:34, color:G, fontWeight:"bold", marginBottom:6 }}>회원가입</h1>
        <div style={{ width:56, height:4, background:GOLD, marginBottom:14, borderRadius:2 }}/>
        <p style={{ color:"#777", marginBottom:36, fontSize:14 }}>회원이 되시면 제품 소식, 상담, 주문 서비스를 이용하실 수 있습니다.</p>
        {done ? (
          <div style={{ textAlign:"center", padding:"56px 20px", background:BG, borderRadius:16 }}>
            <CheckCircle size={60} color={G} style={{ marginBottom:18 }}/>
            <h2 style={{ fontSize:24, color:G, fontWeight:"bold", marginBottom:10 }}>가입이 완료되었습니다!</h2>
            <p style={{ color:"#666", marginBottom:24, lineHeight:1.7 }}>NAC KOREA 회원이 되신 것을 환영합니다.<br/>빠른 시일 내에 연락드리겠습니다.</p>
            <button onClick={() => { setDone(false); setForm({name:"",phone:"",email:"",password:"",password2:""}); go("home"); }}
              style={{ background:G, border:"none", color:"white", padding:"11px 26px", borderRadius:8, cursor:"pointer", fontWeight:"bold", fontSize:14 }}>홈으로 돌아가기</button>
          </div>
        ) : (
          <div style={{ background:"white", borderRadius:16, padding:32, boxShadow:"0 2px 20px rgba(0,0,0,0.07)" }}>
            {/* 이름, 전화번호, 이메일 입력 필드 */}
            {[{ k:"name", l:"이름", t:"text", ph:"홍길동" }, { k:"phone", l:"전화번호", t:"tel", ph:"010-0000-0000" }, { k:"email", l:"이메일", t:"email", ph:"example@email.com" }].map(f => (
              <div key={f.k} style={{ marginBottom:22 }}>
                <label style={{ display:"block", fontWeight:"500", color:"#333", marginBottom:7, fontSize:14 }}>
                  {f.l} <span style={{ color:"#d44" }}>*</span>
                </label>
                <input
                  type={f.t}
                  name={f.k}
                  placeholder={f.ph}
                  value={form[f.k]}
                  onChange={e => {
                    const { name, value } = e.target;
                    setForm(prev => ({ ...prev, [name]: value }));
                    setErrs(prev => ({ ...prev, [name]: "" }));
                  }}
                  style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errs[f.k]?"#d44":"#ddd"}`, borderRadius:8, fontSize:15, outline:"none", background:"white", boxSizing:"border-box" }}
                />
                {errs[f.k] && <p style={{ color:"#d44", fontSize:12, marginTop:5 }}>{errs[f.k]}</p>}
              </div>
            ))}
            {/* 비밀번호 입력 필드 (type=text) */}
            <div style={{ marginBottom:22 }}>
              <label style={{ display:"block", fontWeight:"500", color:"#333", marginBottom:7, fontSize:14 }}>
                비밀번호 <span style={{ color:"#d44" }}>*</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="비밀번호 (8자 이상)"
                value={form.password}
                onChange={e => {
                  setForm(prev => ({ ...prev, password: e.target.value }));
                  setErrs(prev => ({ ...prev, password: "" }));
                }}
                style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errs.password?"#d44":"#ddd"}`, borderRadius:8, fontSize:15, outline:"none", background:"white", boxSizing:"border-box" }}
              />
              {errs.password && <p style={{ color:"#d44", fontSize:12, marginTop:5 }}>{errs.password}</p>}
            </div>
            {/* 비밀번호 확인 입력 필드 (type=text) */}
            <div style={{ marginBottom:22 }}>
              <label style={{ display:"block", fontWeight:"500", color:"#333", marginBottom:7, fontSize:14 }}>
                비밀번호 확인 <span style={{ color:"#d44" }}>*</span>
              </label>
              <input
                type="text"
                name="password2"
                placeholder="비밀번호 확인 (8자 이상)"
                value={form.password2}
                onChange={e => {
                  setForm(prev => ({ ...prev, password2: e.target.value }));
                  setErrs(prev => ({ ...prev, password2: "" }));
                }}
                style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errs.password2?"#d44":"#ddd"}`, borderRadius:8, fontSize:15, outline:"none", background:"white", boxSizing:"border-box" }}
              />
              {errs.password2 && <p style={{ color:"#d44", fontSize:12, marginTop:5 }}>{errs.password2}</p>}
            </div>
            <div style={{ background:BG, borderRadius:8, padding:14, marginBottom:22, fontSize:13, color:"#666", lineHeight:1.65 }}>
              ℹ️ 입력하신 정보는 회원 관리 목적으로만 사용되며 제3자에게 제공되지 않습니다.
            </div>
            <div style={{ background:"#fff8ec", border:`1px solid ${GOLD}44`, borderRadius:8, padding:14, marginBottom:22, fontSize:13, color:"#886" }}>
              💳 추후 카드 결제 시스템 연동 예정 — 구매 편의성을 높여드리겠습니다.
            </div>
            <button onClick={submit} style={{ width:"100%", background:G, border:"none", color:"white", padding:"14px", borderRadius:8, fontSize:16, fontWeight:"bold", cursor:"pointer" }}>회원가입</button>
          </div>
        )}
      </div>
    );
  };

  const renderPage = () => {
    if (page==="company") return <CompanyPage/>;
    if (page==="location") return <LocationPage/>;
    if (["pig","cattle","chicken"].includes(page)) return <ProductPage type={page}/>;
    if (page==="register") return <RegisterPage/>;
    if (page==="login") return <LoginPage/>;
    if (page==="profile") return <ProfilePage/>;
    return <HomePage/>;
  };

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;font-family:'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif}
        .dsk{display:none!important}
        .ham{display:flex!important}
        @media(min-width:768px){.dsk{display:flex!important}.ham{display:none!important}}
        button:hover{opacity:0.88}
        input:focus{border-color:${G}!important;box-shadow:0 0 0 3px ${G}22!important}
      `}</style>
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", background:BG }}>
        <Header/>
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