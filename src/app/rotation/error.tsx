"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="text-center">
      <h2>데이터를 가져오는데 실패했습니다.</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        다시 시도하기
      </button>
    </div>
  );
}
