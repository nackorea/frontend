import { G, GOLD } from "../constants/theme";

// 회원정보 수정 페이지 (구현 예정)
export default function ProfilePage() {
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 30, color: G, fontWeight: "bold", marginBottom: 6 }}>회원정보 수정</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 24, borderRadius: 2 }} />
      <div style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
        <p style={{ color: "#666", fontSize: 15, textAlign: "center" }}>회원정보 수정 페이지 (구현 필요)</p>
      </div>
    </div>
  );
}
