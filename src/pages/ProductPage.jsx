import { G, GOLD } from "../constants/theme";
import { products } from "../constants/products";

function ProductPage({ type, onNavigate }) {
  const d = products[type];
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
        <span style={{ fontSize: 44 }}>{d.icon}</span>
        <div>
          <h1 style={{ fontSize: 32, color: G, fontWeight: "bold" }}>{d.title}</h1>
          <div style={{ width: 56, height: 4, background: GOLD, marginTop: 8, borderRadius: 2 }} />
        </div>
      </div>
      <p style={{ color: "#777", marginTop: 14, marginBottom: 44, fontSize: 15 }}>NAC KOREA의 {d.title}은 과학적으로 검증된 원료로 생산됩니다.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, marginBottom: 44 }}>
        {d.list.map((p, i) => (
          <div key={i} style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ background: `${d.col}14`, borderBottom: `3px solid ${d.col}`, padding: "22px 22px 16px" }}>
              <div style={{ fontSize: 11, color: d.col, fontWeight: "bold", letterSpacing: 1, marginBottom: 5 }}>{p.code}</div>
              <h3 style={{ fontSize: 17, fontWeight: "bold", color: "#1a1a1a", lineHeight: 1.3 }}>{p.name}</h3>
            </div>
            <div style={{ padding: 22 }}>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
              <div style={{ fontSize: 11, color: "#999", fontWeight: "bold", marginBottom: 9, letterSpacing: 0.5 }}>주요 효과</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
                {p.tags.map((tg, j) => (
                  <span key={j} style={{ background: `${d.col}18`, color: d.col, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: "500" }}>{tg}</span>
                ))}
              </div>
              <div style={{ background: "#f8f8f8", borderRadius: 7, padding: "9px 13px", fontSize: 13, color: "#555" }}>
                <strong>사용량:</strong> {p.use}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: G, borderRadius: 14, padding: "28px 36px", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>제품 상담이 필요하신가요?</h3>
          <p style={{ opacity: 0.85, fontSize: 14 }}>전문 상담사가 귀 농장에 맞는 최적의 솔루션을 제안해드립니다</p>
        </div>
        <button onClick={() => onNavigate("register")} style={{ background: GOLD, border: "none", color: "white", padding: "12px 24px", borderRadius: 8, fontSize: 15, fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap" }}>문의하기 →</button>
      </div>
    </div>
  );
}

export default ProductPage;
