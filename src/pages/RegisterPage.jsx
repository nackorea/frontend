import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { G, GOLD, BG, API_BASE } from "../constants/theme";
import Toast from "../components/common/Toast";
import { useToast } from "../hooks/useToast";
import { useForm } from "../hooks/useForm";

// Props:
//   onNavigate(page) - 페이지 이동 (App의 go 함수)
export default function RegisterPage({ onNavigate }) {
  const { form, errs, setErrs, handleChange, resetForm } = useForm({
    name: "", phone: "", email: "", password: "", password2: "",
  });
  const { toast, showToast, clearToast } = useToast();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }

    setLoading(true);
    clearToast();
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "회원가입 실패");
      }
      setDone(true);
      showToast("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("회원가입 실패:", error);
      showToast(error.message || "회원가입 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${hasError ? "#d44" : "#ddd"}`,
    borderRadius: 8, fontSize: 15, outline: "none",
    background: "white", boxSizing: "border-box",
  });

  const textFields = [
    { k: "name",  l: "이름",     t: "text",  ph: "홍길동" },
    { k: "phone", l: "전화번호", t: "tel",   ph: "010-0000-0000" },
    { k: "email", l: "이메일",   t: "email", ph: "example@email.com" },
  ];

  if (done) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ textAlign: "center", padding: "56px 20px", background: BG, borderRadius: 16 }}>
          <CheckCircle size={60} color={G} style={{ marginBottom: 18 }} />
          <h2 style={{ fontSize: 24, color: G, fontWeight: "bold", marginBottom: 10 }}>가입이 완료되었습니다!</h2>
          <p style={{ color: "#666", marginBottom: 24, lineHeight: 1.7 }}>
            NAC KOREA 회원이 되신 것을 환영합니다.<br />빠른 시일 내에 연락드리겠습니다.
          </p>
          <button
            onClick={() => { setDone(false); resetForm(); onNavigate("home"); }}
            style={{ background: G, border: "none", color: "white", padding: "11px 26px", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14 }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 34, color: G, fontWeight: "bold", marginBottom: 6 }}>회원가입</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 14, borderRadius: 2 }} />
      <p style={{ color: "#777", marginBottom: 36, fontSize: 14 }}>회원이 되시면 제품 소식, 상담, 주문 서비스를 이용하실 수 있습니다.</p>
      <div style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>

        {/* 이름 / 전화번호 / 이메일 */}
        {textFields.map((f) => (
          <div key={f.k} style={{ marginBottom: 22 }}>
            <label style={{ display: "block", fontWeight: "500", color: "#333", marginBottom: 7, fontSize: 14 }}>
              {f.l} <span style={{ color: "#d44" }}>*</span>
            </label>
            <input
              type={f.t}
              name={f.k}
              placeholder={f.ph}
              value={form[f.k]}
              onChange={handleChange}
              style={inputStyle(errs[f.k])}
            />
            {errs[f.k] && <p style={{ color: "#d44", fontSize: 12, marginTop: 5 }}>{errs[f.k]}</p>}
          </div>
        ))}

        {/* 비밀번호 */}
        {[
          { k: "password",  l: "비밀번호",      ph: "비밀번호 (8자 이상)" },
          { k: "password2", l: "비밀번호 확인", ph: "비밀번호 확인 (8자 이상)" },
        ].map((f) => (
          <div key={f.k} style={{ marginBottom: 22 }}>
            <label style={{ display: "block", fontWeight: "500", color: "#333", marginBottom: 7, fontSize: 14 }}>
              {f.l} <span style={{ color: "#d44" }}>*</span>
            </label>
            <input
              type="password"
              name={f.k}
              placeholder={f.ph}
              value={form[f.k]}
              onChange={handleChange}
              style={inputStyle(errs[f.k])}
            />
            {errs[f.k] && <p style={{ color: "#d44", fontSize: 12, marginTop: 5 }}>{errs[f.k]}</p>}
          </div>
        ))}

        <div style={{ background: BG, borderRadius: 8, padding: 14, marginBottom: 22, fontSize: 13, color: "#666", lineHeight: 1.65 }}>
          ℹ️ 입력하신 정보는 회원 관리 목적으로만 사용되며 제3자에게 제공되지 않습니다.
        </div>
        <div style={{ background: "#fff8ec", border: `1px solid ${GOLD}44`, borderRadius: 8, padding: 14, marginBottom: 22, fontSize: 13, color: "#886" }}>
          💳 추후 카드 결제 시스템 연동 예정 — 구매 편의성을 높여드리겠습니다.
        </div>
        <button
          onClick={submit}
          disabled={loading}
          style={{ width: "100%", background: G, border: "none", color: "white", padding: "14px", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
        >
          회원가입
        </button>
        <Toast message={toast} onDone={clearToast} />
      </div>
    </div>
  );
}
