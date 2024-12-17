"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // 클라이언트 사이드 마운트 후 실행
  }, []);

  if (!mounted) return null; // 서버 사이드 렌더링 중에는 아무것도 표시하지 않음

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 border rounded-md bg-gray-300 dark:bg-gray-800 text-black dark:text-white"
    >
      {resolvedTheme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
