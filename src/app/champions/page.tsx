import Link from "next/link";
import Image from "next/image";
import { ChampionData } from "@/types/Champion";

export default async function ChampionsPage() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json",
    {
      next: { revalidate: 86400 },
    }
  );

  const data = await response.json();
  const champions: Record<string, ChampionData> = data.data;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">챔피언 목록</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {Object.entries(champions).map(([key, champion]) => (
          <li
            key={key}
            className="bg-black text-white rounded-2xl shadow-lg w-56 h-96 flex flex-col items-center justify-center p-4
             transform transition duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
          >
            <Link href={`/champions/${key}`}>
              <div className="relative w-56 h-56">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 256px"
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold mb-2 text-[#f7b538]">
                  {champion.name}
                </h2>
                <p className="text-sm text-gray-400">{champion.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
