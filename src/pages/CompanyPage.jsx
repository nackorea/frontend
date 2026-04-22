import { G, GOLD, BG } from "../constants/theme";

function CompanyPage() {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 34, color: G, fontWeight: "bold", marginBottom: 6 }}>회사소개</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 40, borderRadius: 2 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 40, marginBottom: 56 }}>
        <div>
          <h2 style={{ fontSize: 22, color: G, marginBottom: 14, fontWeight: "bold" }}>회사 개요</h2>
          <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 14 }}>NAC KOREA는 2010년 설립된 사료 첨가제 전문 기업으로, 축산업의 생산성 향상과 동물 복지 실현을 목표로 하고 있습니다.</p>
          <p style={{ color: "#555", lineHeight: 1.85 }}>국내외 최고 연구기관과의 협력을 통해 개발된 제품들은 수많은 농가에서 그 효과를 인정받고 있으며, 건강하고 안전한 축산 환경 조성에 앞장서고 있습니다.</p>
        </div>
        <div style={{ background: BG, borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 18, color: G, marginBottom: 18, fontWeight: "bold" }}>회사 정보</h2>
          {[
            ["설립연도", "2010년"],
            ["대표이사", "홍길동"],
            ["사업 분야", "사료 첨가제 제조·판매"],
            ["임직원", "50명"],
            ["주요 인증", "ISO 9001, GMP 인증"],
            ["연간 매출", "100억원+"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", paddingBottom: 10, borderBottom: "0.5px solid #dde8d6", marginBottom: 10 }}>
              <span style={{ color: "#888", width: 90, flexShrink: 0, fontSize: 13 }}>{k}</span>
              <span style={{ color: "#333", fontWeight: "500", fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <h2 style={{ fontSize: 22, color: G, marginBottom: 20, fontWeight: "bold" }}>연혁</h2>
      <div style={{ borderLeft: `3px solid ${G}`, paddingLeft: 24, marginBottom: 48 }}>
        {[
          ["2010", "NAC KOREA 설립"],
          ["2012", "돼지 전용 사료 첨가제 첫 출시"],
          ["2014", "ISO 9001 인증 취득"],
          ["2016", "소·닭 제품 라인 확장"],
          ["2018", "GMP 인증 취득 및 수출 시작"],
          ["2020", "창립 10주년 — 연간 매출 100억 달성"],
          ["2023", "R&D 센터 확장 및 신제품 10종 출시"],
        ].map(([y, t]) => (
          <div key={y} style={{ position: "relative", marginBottom: 20 }}>
            <div style={{ position: "absolute", left: -31, top: 4, width: 14, height: 14, borderRadius: "50%", background: GOLD, border: `2px solid ${G}` }} />
            <span style={{ fontWeight: "bold", color: G, marginRight: 14, fontSize: 14 }}>{y}</span>
            <span style={{ color: "#555", fontSize: 14 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyPage;
