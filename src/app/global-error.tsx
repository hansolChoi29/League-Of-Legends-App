"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error; // 에러 객체
  reset: () => void; // 에러 상태를 리셋하는 함수
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  // 클라이언트 측에서 오류 리셋 처리
  const handleReset = () => {
    reset(); // 함수 호출을 명확하게 수행
  };

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center min-h-screen bg-red-100">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            예기치 못한 오류가 발생했습니다!
          </h1>
          <p className="text-gray-800 mb-4">{error.message}</p>
          <button
            onClick={handleReset} // 리셋 함수 호출
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            다시 시도하기
          </button>
        </div>
      </body>
    </html>
  );
}
