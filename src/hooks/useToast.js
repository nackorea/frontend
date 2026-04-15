import { useState } from "react";

// Toast 메시지 상태를 관리하는 커스텀 훅
// LoginPage, RegisterPage 등 toast가 필요한 곳에서 공통으로 사용
export function useToast() {
  const [toast, setToast] = useState("");
  const showToast = (msg) => setToast(msg);
  const clearToast = () => setToast("");
  return { toast, showToast, clearToast };
}
