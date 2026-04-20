import { useState, useEffect } from "react";
import { G, GOLD, BG, API_BASE } from "../constants/theme";
import Toast from "../components/common/Toast";
import { useToast } from "../hooks/useToast";

// localStorage에서 토큰을 읽어 공백을 제거한 뒤 반환
// null·"null"·"undefined"·빈 문자열이면 null 반환
function readToken() {
  const raw = localStorage.getItem("token");
  const t = raw?.trim() ?? "";
  return t && t !== "null" && t !== "undefined" ? t : null;
}

export default function ProfilePage() {
  const { toast, showToast, clearToast } = useToast();
  const [loading, setLoading]       = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // 읽기 전용 (이름·이메일)
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  // 수정 가능 필드
  const [phone,           setPhone]           = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errs, setErrs] = useState({});

  // 현재 회원 정보 조회
  useEffect(() => {
    const load = async () => {
      const token = readToken();
      if (!token) { setFetchLoading(false); return; } // 토큰 없으면 빈 폼
      try {
        const res = await fetch(`${API_BASE}/api/members/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUserInfo({ name: data.name || "", email: data.email || "" });
        setPhone(data.phone || "");
      } catch {
        // 조회 실패 시 빈 폼으로 시작
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, []);

  const clearErr = (field) =>
    setErrs((prev) => ({ ...prev, [field]: "" }));

  const validate = () => {
    const e = {};
    if (!phone.trim()) e.phone = "전화번호를 입력해주세요";
    else if (!/^[\d\-+\s]{9,15}$/.test(phone)) e.phone = "올바른 전화번호를 입력해주세요";

    // password는 API 필수값
    if (!password) e.password = "비밀번호를 입력해주세요";
    else if (password.length < 8) e.password = "비밀번호는 8자 이상이어야 합니다";
    if (!confirmPassword) e.confirmPassword = "비밀번호 확인을 입력해주세요";
    else if (password !== confirmPassword) e.confirmPassword = "비밀번호가 일치하지 않습니다";

    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) { setErrs(errors); return; }

    const token = readToken();
    if (!token) {
      showToast("로그인이 필요합니다. 다시 로그인해주세요.");
      return;
    }

    setLoading(true);
    clearToast();

    // API 스펙: phone + password 모두 필수
    const body = { phone, password };

    console.log("[ProfilePage] PUT Authorization header →", `Bearer ${token.slice(0, 20)}...`);

    try {
      const res = await fetch(`${API_BASE}/api/members/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        let errMsg = `수정 실패 (${res.status})`;
        try {
          const errData = JSON.parse(errText);
          errMsg = errData.message || errData.error || errMsg;
        } catch {
          if (errText) errMsg = errText.slice(0, 80); // 서버 원문 일부 표시
        }
        console.error(`PUT /api/members/me → ${res.status}`, errText);
        throw new Error(errMsg);
      }

      // 비밀번호 필드 초기화
      setPassword("");
      setConfirmPassword("");
      setErrs({});
      showToast("회원정보가 수정되었습니다!");
    } catch (err) {
      showToast(
        err instanceof TypeError
          ? "서버에 연결할 수 없습니다."
          : err.message || "수정 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 스타일 헬퍼
  const inputStyle = (hasErr) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${hasErr ? "#d44" : "#ddd"}`,
    borderRadius: 8, fontSize: 15, outline: "none",
    background: "white", boxSizing: "border-box",
  });

  const readonlyStyle = {
    width: "100%", padding: "11px 14px",
    border: "1.5px solid #e8e8e8",
    borderRadius: 8, fontSize: 15, outline: "none",
    background: "#f5f5f5", color: "#999", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontWeight: "500",
    color: "#333", marginBottom: 7, fontSize: 14,
  };

  const errStyle = { color: "#d44", fontSize: 12, marginTop: 5 };

  if (fetchLoading) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ color: "#aaa", fontSize: 15 }}>정보를 불러오는 중…</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 30, color: G, fontWeight: "bold", marginBottom: 6 }}>회원정보 수정</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 28, borderRadius: 2 }} />

      <form onSubmit={handleSubmit}>

        {/* ── 기본 정보 (읽기 전용) ── */}
        <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.07)", marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: "bold", color: G, marginBottom: 18, letterSpacing: 1, textTransform: "uppercase" }}>
            기본 정보 <span style={{ color: "#bbb", fontWeight: "normal", fontSize: 11 }}>— 변경 불가</span>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>이름</label>
            <input type="text" value={userInfo.name} readOnly style={readonlyStyle} />
          </div>

          <div>
            <label style={labelStyle}>이메일</label>
            <input type="email" value={userInfo.email} readOnly style={readonlyStyle} />
          </div>
        </div>

        {/* ── 수정 가능 정보 ── */}
        <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: "bold", color: G, marginBottom: 22, letterSpacing: 1, textTransform: "uppercase" }}>
            수정 가능 정보
          </div>

          {/* 전화번호 */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>
              전화번호 <span style={{ color: "#d44" }}>*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }}
              placeholder="010-0000-0000"
              style={inputStyle(errs.phone)}
            />
            {errs.phone && <p style={errStyle}>{errs.phone}</p>}
          </div>

          {/* 구분선 */}
          <div style={{ height: "1px", background: "#eee", marginBottom: 22 }} />

          <div style={{ background: BG, borderRadius: 8, padding: "11px 14px", marginBottom: 22, fontSize: 13, color: "#777" }}>
            ℹ️ 전화번호와 비밀번호는 저장 시 항상 함께 입력해야 합니다.
          </div>

          {/* 비밀번호 */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              비밀번호 <span style={{ color: "#d44" }}>*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearErr("password"); }}
              placeholder="비밀번호 (8자 이상)"
              style={inputStyle(errs.password)}
            />
            {errs.password && <p style={errStyle}>{errs.password}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>
              비밀번호 확인 <span style={{ color: "#d44" }}>*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearErr("confirmPassword"); }}
              placeholder="비밀번호 확인"
              style={inputStyle(errs.confirmPassword)}
            />
            {errs.confirmPassword && <p style={errStyle}>{errs.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", background: G, border: "none",
              color: "white", padding: "14px", borderRadius: 8,
              fontSize: 16, fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "저장 중…" : "저장하기"}
          </button>
        </div>
      </form>

      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
