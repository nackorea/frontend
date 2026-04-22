import { G, GL, GOLD, BG } from "../constants/theme";

function PressPage() {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 34, color: G, fontWeight: "bold", marginBottom: 6 }}>보도자료</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 40, borderRadius: 2 }} />

      <div style={{ marginBottom: 44, borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
        <img
          src="/images/company/livestock-banner.png"
          alt="축산관련단체협의회"
          style={{ width: "100%", display: "block" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextElementSibling.style.display = "flex";
          }}
        />
        <div style={{ display: "none", background: `linear-gradient(160deg,${G} 0%,${GL} 60%,#2a8c45 100%)`, minHeight: 300, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", textAlign: "center", gap: 14 }}>
          <div style={{ fontSize: 48 }}>🐄🐷🐔</div>
          <h2 style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>축산관련단체협의회</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.85, maxWidth: 540 }}>
            각 단체들의 유대협력 및 공동이익 증진, 축산물 품질향상,<br />국제경쟁력 제고등 축산업의 발전에 기여합니다.
          </p>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 14, padding: "36px 40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "0.5px solid #e8e8e8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 20, borderBottom: `2px solid ${BG}` }}>
          <span style={{ background: G, color: "white", fontSize: 11, fontWeight: "bold", padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5 }}>보도자료</span>
          <span style={{ color: "#999", fontSize: 13 }}>(서울=연합뉴스) 신선미 기자</span>
        </div>

        <p style={{ color: "#333", lineHeight: 2, fontSize: 15, marginBottom: 22 }}>
          축산농민단체는 23일 양곡관리법 개정안과 농수산물 유통 및 가격안정법(농안법) 개정안에 대해 "원점에서 재검토하라"고 국회에 요구했다.
        </p>

        <p style={{ color: "#333", lineHeight: 2, fontSize: 15, marginBottom: 22 }}>
          대한한돈협회 등 20여개 단체로 구성된 축산관련단체협의회는 23일 성명을 통해 "두 개정안이 시행되면 매년 쌀 매입과 (농산물) 가격안정에 매년 수조원의 예산이 소요될 것으로 예상된다"며 "양곡을 제외한 축산업 등 다른 품목에 대한 예산 축소로 이어질 수 있다"고 주장했다.
        </p>

        <p style={{ color: "#333", lineHeight: 2, fontSize: 15, marginBottom: 22 }}>
          이어 "축산업은 현재 사료 가격 폭등 등으로 초유의 위기에 직면해 있으나 쌀 시장격리 의무화로 막대한 재정이 투입되면 축산업 분야 예산은 축소될 가능성이 농후하다"며 "이는 축산농가에 죽으라는 말과 다름없는 처사"라고 강조했다.
        </p>

        <p style={{ color: "#333", lineHeight: 2, fontSize: 15, marginBottom: 22 }}>
          축산관련단체협의회는 "농민이 정쟁의 희생양이 되는 것을 용납할 수 없다"며 "여야 어느 한쪽의 편 가르기식 논리에 농업 미래가 볼모로 잡혀서는 안 된다"고 밝혔다.
        </p>

        <p style={{ color: "#333", lineHeight: 2, fontSize: 15, marginBottom: 22 }}>
          이어 "지난해 제기된 우려 사항이 제대로 해소되지 않은 채 섣부른 입법 처리로 내몰린다면 농업 현장에 엄청난 혼란을 야기할 것"이라며 "국회는 각계각층의 의견에 폭넓게 귀 기울이고, 농업인의 눈높이에서 진정으로 농업·농촌을 위하는 길이 무엇인지 고민한 뒤 농민이 공감하고 지지할 수 있는 해법을 마련해달라"고 호소했다.
        </p>

        <div style={{ background: BG, borderRadius: 10, padding: "20px 24px", marginTop: 8 }}>
          <p style={{ color: "#555", lineHeight: 1.9, fontSize: 14 }}>
            국회 농림축산식품해양수산위원회는 지난 18일 전체회의를 열어 야당 단독으로 양곡법, 농안법 개정안을 본회의에 직회부하기로 의결했다.
          </p>
          <p style={{ color: "#555", lineHeight: 1.9, fontSize: 14, marginTop: 14 }}>
            양곡법 개정안은 쌀값이 폭락하면 초과 생산량을 정부가 사들이도록 하는 것이 주 내용이고 농안법 개정안에는 농산물값이 기준치 미만으로 하락하면 정부가 그 차액을 생산자에게 지급하도록 하는 '가격보장제'가 담겼다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PressPage;
