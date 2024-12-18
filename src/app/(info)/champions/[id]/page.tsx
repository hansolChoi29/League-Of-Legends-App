// SSR 강제: 항상 최신 데이터를 가져옵니다.
// export const dynamic = "force-dynamic";
// 동적렌더링 제어
// export const dynamic = "force-dynamic"; // SSR 강제 => 레드스크린

// 정적 경로를 생성 (Vercel 배포 시 필요)

"use client"; // 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";
import { ChampionData } from "@/types/Champion";
import Link from "next/link";

export default function ChampionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [champion, setChampion] = useState<ChampionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchChampion() {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion/${params.id}.json`
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오지 못했습니다.");
        }

        const data = await response.json();
        setChampion(data.data[params.id]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchChampion();
  }, [params.id]);
  // versel.json에 id 추가했더니 버셀에서 인식됨..
  // {
  //   "rewrites": [
  //     {
  //       "source": "/champions/:id",
  //       "destination": "/champions/[id]"
  //     }
  //   ]
  // }

  if (loading) return <div>로딩 중...</div>;
  if (error || !champion) return <div>데이터를 불러오지 못했습니다.</div>;
  return (
    <div className="relative bg-[#001d3d] text-white h-fit py-6">
      <div
        className="absolute inset-0 bg-cover bg-right opacity-60"
        style={{
          backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg)`,
        }}
      ></div>

      <div className="relative z-10 lg:w-1/2 p-26 py-32">
        <h1 className="text-5xl text-lolGold font-bold mb-6">
          {champion.name}
        </h1>
        <p className="text-lg text-gray-300 mb-2 font-bold">{champion.blurb}</p>
        <div className="flex display-col font-bold">
          <div className="border border-lolGold p-4 m-4 w-50">
            <h2 className="text-3xl font-bold text-lolGold mt-6 mb-4">
              능력치
            </h2>
            <ul className="grid gap-2 text-gray-200">
              <li>체력: {champion.stats.hp}</li>
              <li>공격력: {champion.stats.attackdamage}</li>
              <li>이동 속도: {champion.stats.movespeed}</li>
              <li>마법 저항력: {champion.stats.spellblock}</li>
            </ul>
          </div>
          <div className="p-4 m-4 w-44">
            <ul className="flex gap-2 flex-wrap">
              {champion.tags.map((tag: any) => (
                <li key={tag} className="px-3 py-1 bg-gray-800 rounded-full">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Link
          href={"/champions"}
          className="p-4 text-[#f7b538] bg-[#001d3d] rounded-xl font-semibold hover:text-white"
        >
          뒤로
        </Link>
      </div>
    </div>
  );
}
