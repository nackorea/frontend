import { MapPin, Phone } from "lucide-react";
import { G, GOLD, BG } from "../constants/theme";

function LocationPage() {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 34, color: G, fontWeight: "bold", marginBottom: 6 }}>회사위치</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 40, borderRadius: 2 }} />
      <div style={{ width: "100%", height: 300, background: "#e2f0e2", borderRadius: 14, marginBottom: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `2px dashed #91c48a`, gap: 10 }}>
        <MapPin size={44} color={G} />
        <p style={{ color: G, fontWeight: "bold", fontSize: 17 }}>Google Maps 연동 위치</p>
        <p style={{ color: "#888", fontSize: 13 }}>경기도 성남시 분당구 판교역로 xxx</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
        {[
          { icon: <MapPin size={18} color={G} />, t: "본사 주소", c: "경기도 성남시 분당구\n판교역로 xxx\n판교 테크노밸리 xxx동 xxx호" },
          { icon: <Phone size={18} color={G} />, t: "연락처", c: "대표전화: 02-1234-5678\n팩스: 02-1234-5679\n이메일: info@nac-korea.com\n업무시간: 평일 09:00~18:00" },
          { icon: <span style={{ fontSize: 16 }}>🚌</span>, t: "교통편", c: "지하철: 신분당선 판교역 5번 출구 도보 10분\n버스: 판교역 정류장 하차\n자가용: 경부고속도로 판교IC 5분" },
        ].map((x, i) => (
          <div key={i} style={{ background: BG, borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: G, fontWeight: "bold", fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>{x.icon} {x.t}</h3>
            <p style={{ color: "#555", lineHeight: 1.85, fontSize: 14, whiteSpace: "pre-line" }}>{x.c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationPage;
