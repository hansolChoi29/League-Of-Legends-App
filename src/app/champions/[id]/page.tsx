import { ChampionData } from "@/types/Champion";
import Link from "next/link";
import { notFound } from "next/navigation";

// Vercel 배포 시 정적 경로를 설정
export async function generateStaticParams() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
  );
  const data = await response.json();

  // 챔피언 ID 리스트를 반환
  return Object.keys(data.data).map((id) => ({ id }));
}

export const dynamic = "force-dynamic"; // SSR 강제 (최신 데이터 보장)

export default async function ChampionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("Params:", params);

  // Riot API에서 챔피언 데이터 가져오기
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion/${params.id}.json`,
    { cache: "no-store" }
  );

  // 잘못된 경로 또는 API 오류 처리
  if (!response.ok) {
    console.error("Failed to fetch data:", response.status);
    notFound(); // Next.js 404 페이지 리다이렉트
  }

  const data = await response.json();
  const champion: ChampionData = data.data[params.id];

  // 잘못된 챔피언 데이터 접근 시
  if (!champion) {
    notFound();
  }

  return (
    <div className="relative bg-[#001d3d] text-white h-fit py-6">
      <div
        className="absolute inset-0 bg-cover bg-right opacity-60"
        style={{
          backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg)`,
        }}
      ></div>

      <div className="relative z-10 lg:w-1/2 p-24">
        <h1 className="text-5xl text-lolGold font-bold mb-6">
          {champion.name}
        </h1>
        <p className="text-lg text-gray-300 mb-2 font-bold">{champion.blurb}</p>

        <div className="flex display-col font-bold">
          <div className="border border-lolGold p-4 m-4 w-50">
            <div className="bg-gray-800 p-4">
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
          </div>
          <div className="p-4 m-4 w-44">
            <div className="p-4">
              <ul className="flex gap-2 flex-wrap">
                {champion.tags.map((tag) => (
                  <li key={tag} className="px-3 py-1 bg-gray-800 rounded-full">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
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
