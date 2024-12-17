import { ChampionData } from "@/types/Champion";
import Link from "next/link";

// **SSR 강제**: Vercel에서 항상 데이터를 요청 시점에 가져오도록 설정합니다.
export const dynamic = "force-dynamic";

export default async function ChampionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 로그 추가: Vercel에서 params.id 값이 제대로 전달되는지 확인
  console.log("Params on Vercel:", params);

  try {
    // Riot API를 통해 챔피언 데이터를 가져옵니다.
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion/${params.id}.json`,
      {
        cache: "no-store", // 항상 최신 데이터를 가져옵니다.
      }
    );

    // 응답 확인: 상태 로그 확인
    console.log("API Response Status:", response.status);

    // 에러 처리
    if (!response.ok) {
      console.error("Failed to fetch data on Vercel:", response.status);
      return (
        <div className="text-center text-red-500 text-2xl">
          ❌ 챔피언을 찾을 수 없습니다.
        </div>
      );
    }

    const data = await response.json();
    const champion: ChampionData = data.data[params.id];

    return (
      <div className="relative bg-[#001d3d] text-white h-fit py-6">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-right opacity-60"
          style={{
            backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg)`,
          }}
        ></div>

        {/* 챔피언 정보 */}
        <div className="relative z-10 lg:w-1/2 p-24">
          <h1 className="text-5xl text-lolGold font-bold mb-6">
            {champion.name}
          </h1>
          <p className="text-lg text-gray-300 mb-2 font-bold">
            {champion.blurb}
          </p>

          {/* 능력치 */}
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
                    <li
                      key={tag}
                      className="px-3 py-1 bg-gray-800 rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 뒤로가기 버튼 */}
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
  } catch (error) {
    // 예외 처리
    console.error("Error fetching champion data:", error);
    return (
      <div className="text-center text-red-500 text-2xl">
        ❌ 데이터 로딩 중 오류가 발생했습니다.
      </div>
    );
  }
}
