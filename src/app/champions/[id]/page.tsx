import { ChampionData } from "@/types/Champion";
import Link from "next/link";

// 챔피언 상세 페이지, SSR을 통해 서버에서 데이터 가져오기

export async function generateMetadata({ params }: { params: { id: string } }) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion/${params.id}.json`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const champion: ChampionData = data.data[params.id];

  if (!champion) {
    return {
      title: "챔피언을 찾을 수 없습니다.",
      description: "해당 챔피언의 정보를 가져올 수 없습니다.",
    };
  }

  return {
    title: `${champion.name} - 리그 오브 레전드`,
    description: `${champion.name}: ${champion.blurb}`,
  };
}

export default async function ChampionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion/${params.id}.json`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const champion: ChampionData = data.data[params.id];

  if (!champion) {
    return <div>챔피언을 찾을 수 없습니다.</div>;
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

      {/* 버튼을 화면 정 가운데 하단에 고정 */}
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
