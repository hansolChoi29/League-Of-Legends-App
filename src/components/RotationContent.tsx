// 문제점/.
// if (!rotationData || !championData) return <div>로딩 중...</div>;

"use client";

import { useQuery } from "@tanstack/react-query";
import { Champion } from "@/types/Champion";
import Image from "next/image";
import { ChampionRotation } from "@/types/ChampionRotation";

async function fetchChampionRotation(): Promise<ChampionRotation> {
  const response = await fetch("/api/rotation");
  if (!response.ok)
    throw new Error("로테이션 데이터를 가져오는데 실패했습니다.");
  return response.json();
}

async function fetchChampionData(): Promise<Record<string, Champion>> {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
  );
  if (!response.ok) throw new Error("챔피언 데이터를 가져오는데 실패했습니다.");
  const data = await response.json();
  return data.data;
}

export default function RotationContent() {
  const {
    data: rotationData,
    isPending: isRotationLoading,
    isError: isRotationError,
  } = useQuery({
    queryKey: ["championRotation"],
    queryFn: fetchChampionRotation,
  });

  const {
    data: championData,
    isPending: isChampionLoading,
    isError: isChampionError,
  } = useQuery({
    queryKey: ["championData"],
    queryFn: fetchChampionData,
  });

  if (isRotationLoading || isChampionLoading)
    return <div className="text-center">잠시만 기다려주세요!</div>;

  if (isRotationError || isChampionError)
    throw new Error("로테이션 데이터를 불러오는 중 에러 발생");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">로테이션 챔피언</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {rotationData.freeChampionIds.map((id) => {
          const champ = Object.values(championData).find(
            (champion) => parseInt(champion.key) === id
          );
          if (!champ) return null;

          return (
            <li
              key={id}
              className="bg-black text-white rounded-2xl shadow-lg w-56 h-96 flex flex-col items-center justify-center p-4"
            >
              <div className="relative w-56 h-80 flex flex-col items-center">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
                  alt={champ.name}
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1200px) 256px, 512px"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="font-bold text-[#f7b538]">{champ.name}</p>
              <p className="text-sm text-gray-500">{champ.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
