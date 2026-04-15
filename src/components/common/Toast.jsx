import { useEffect } from "react";

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      if (onDone) onDone();
    }, 1000);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;

  return (
    <div style={{
      position: "fixed", bottom: 60, left: "50%", transform: "translateX(-50%)",
      background: "#222", color: "#fff", padding: "22px 60px", borderRadius: 14,
      fontSize: 18, zIndex: 9999, boxShadow: "0 4px 32px #0005",
      minWidth: 320, textAlign: "center", fontWeight: 600
    }}>
      {message}
    </div>
  );
}
