import { useState } from "react";
import { G, GOLD, API_BASE } from "../constants/theme";
import Toast from "../components/common/Toast";
import { useToast } from "../hooks/useToast";

// Props:
//   onLoginSuccess(accessToken, role) - 로그인 성공 시 App에서 토큰/상태 업데이트
//   onNavigate(page)                  - 페이지 이동 (App의 go 함수)
//   isLogin                           - 이미 로그인 상태면 홈으로 리다이렉트
export default function LoginPage({ onLoginSuccess, onNavigate, isLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const { toast, showToast, clearToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [serverCheckLoading, setServerCheckLoading] = useState(false);

  // 이미 로그인 상태면 홈으로 이동
  if (isLogin) {
    onNavigate("home");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearToast();
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (!res.ok) throw new Error("AUTH_FAIL");
      const data = await res.json();
      if (data.accessToken) {
        onLoginSuccess(data.accessToken, data.member.role);
      }
      showToast("로그인 성공!");
    } catch (err) {
      // TypeError → 네트워크/서버 연결 문제, 그 외 → 인증 실패
      if (err instanceof TypeError) {
        showToast("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      } else {
        showToast("이메일 또는 비밀번호를 확인하세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleServerCheck = async () => {
    setServerCheckLoading(true);
    clearToast();
    try {
      const res = await fetch(`${API_BASE}/api/health/detail`);
      if (!res.ok) throw new Error(`서버 응답 오류 (${res.status})`);
      showToast("서버 연결 성공!");
    } catch (err) {
      // 서버 체크는 서버가 꺼진 상황이 예상 시나리오이므로 console.error 미사용
      const msg = err instanceof TypeError
        ? "서버에 연결할 수 없습니다."
        : err.message;
      showToast(msg);
    } finally {
      setServerCheckLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", border: "1.5px solid #ddd",
    borderRadius: 8, fontSize: 15, outline: "none",
    background: "white", boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 30, color: G, fontWeight: "bold", marginBottom: 6 }}>로그인</h1>
      <div style={{ width: 56, height: 4, background: GOLD, marginBottom: 24, borderRadius: 2 }} />
      <form onSubmit={handleLogin} style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", fontWeight: "500", color: "#333", marginBottom: 7, fontSize: 14 }}>이메일</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: "block", fontWeight: "500", color: "#333", marginBottom: 7, fontSize: 14 }}>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required style={inputStyle} />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", background: G, border: "none", color: "white", padding: "14px", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={handleServerCheck}
          disabled={serverCheckLoading}
          style={{ width: "100%", background: "#f0f0f0", border: "1px solid #ddd", color: "#333", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: "500", cursor: "pointer", marginTop: 12, opacity: serverCheckLoading ? 0.7 : 1 }}
        >
          {serverCheckLoading ? "서버 체크 중..." : "서버 상태 확인"}
        </button>
      </form>
      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
