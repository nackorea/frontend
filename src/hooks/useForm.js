import { useState } from "react";

// 폼 상태 + onChange + 에러 자동 초기화를 관리하는 커스텀 훅
// RegisterPage처럼 유효성 검사가 있는 폼에서 사용
export function useForm(initialValues) {
  const [form, setForm] = useState(initialValues);
  const [errs, setErrs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrs((prev) => ({ ...prev, [name]: "" }));
  };

  const resetForm = () => setForm(initialValues);

  return { form, setForm, errs, setErrs, handleChange, resetForm };
}
