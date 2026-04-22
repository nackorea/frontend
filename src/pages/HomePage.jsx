import { G, GL, GOLD, BG } from "../constants/theme";

function HomePage({ onNavigate }) {
  return (
    <div>
      <div style={{ background: `linear-gradient(160deg,${G} 0%,${GL} 60%,#2a8c45 100%)`, color: "white", padding: "90px 20px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🌿</div>
          <h1 style={{ fontSize: "clamp(26px,5vw,50px)", fontWeight: "bold", marginBottom: 14, lineHeight: 1.2 }}>건강한 축산업의 시작,<br />NAC KOREA</h1>
          <p style={{ fontSize: "clamp(14px,2vw,18px)", opacity: 0.88, marginBottom: 36, lineHeight: 1.7 }}>
            과학적으로 검증된 사료 첨가제로 여러분의 축산 경쟁력을 높여드립니다.<br />
            건강하고 생산성 높은 축산업을 함께 만들어갑니다.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => onNavigate("pig")} style={{ background: GOLD, border: "none", color: "white", padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: "bold", cursor: "pointer" }}>제품 보러가기</button>
            <button onClick={() => onNavigate("company")} style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.7)", color: "white", padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: "bold", cursor: "pointer" }}>회사소개</button>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, color: G, marginBottom: 6, fontWeight: "bold" }}>NAC KOREA만의 강점</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: 44, fontSize: 15 }}>과학과 자연이 만난 최고의 사료 첨가제</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 20 }}>
            {[
              ["🔬", "과학적 검증", "국내외 연구기관과 협력, 엄격히 검증된 제품만 공급합니다"],
              ["🌿", "천연 원료", "안전한 천연 원료 사용으로 항생제 사용을 최소화합니다"],
              ["📈", "생산성 향상", "사료 효율 개선과 성장 촉진으로 수익성을 높여드립니다"],
              ["🏆", "품질 인증", "ISO 9001·GMP 인증으로 일관된 최고 품질을 보장합니다"],
            ].map(([ic, t, d], i) => (
              <div key={i} style={{ background: BG, borderRadius: 12, padding: 26, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{ic}</div>
                <h3 style={{ color: G, fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>{t}</h3>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.65 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: BG, padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, color: G, marginBottom: 6, fontWeight: "bold" }}>제품 카테고리</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: 44, fontSize: 15 }}>축종별 맞춤형 사료 첨가제 솔루션</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
            {[
              { ic: "🐷", t: "돼지 전용", d: "성장 촉진부터 육질 개선까지 돼지 전용 사료 첨가제", p: "pig", bg: "#fff4ed", bdr: "#c0570a" },
              { ic: "🐄", t: "소 전용", d: "한우 마블링 향상부터 착유량 증진까지 소 전용 첨가제", p: "cattle", bg: "#f7f0ec", bdr: "#6d3a1f" },
              { ic: "🐔", t: "닭 전용", d: "육계·산란계 모두를 위한 닭 전용 생산성 향상 첨가제", p: "chicken", bg: "#fff8ec", bdr: "#b54500" },
            ].map((c, i) => (
              <div key={i} onClick={() => onNavigate(c.p)}
                style={{ background: c.bg, border: `2px solid ${c.bdr}33`, borderRadius: 16, padding: 30, cursor: "pointer", textAlign: "center", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.bdr}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>{c.ic}</div>
                <h3 style={{ fontSize: 20, fontWeight: "bold", color: "#222", marginBottom: 8 }}>{c.t}</h3>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>{c.d}</p>
                <span style={{ background: c.bdr, color: "white", padding: "7px 18px", borderRadius: 20, fontSize: 13, fontWeight: "bold" }}>제품 보기 →</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: G, padding: "56px 20px", textAlign: "center", color: "white" }}>
        <h2 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 12 }}>지금 바로 문의하세요</h2>
        <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 15 }}>전문 상담사가 귀 농장에 맞는 최적의 제품을 추천해 드립니다</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {[["📞", "02-1234-5678"], ["✉️", "info@nac-korea.com"]].map(([ic, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", padding: "11px 22px", borderRadius: 8, fontSize: 14 }}>{ic} {t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
