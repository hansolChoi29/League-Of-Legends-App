// 모든 아이템 목록 페이지, SSG 방식으로 정적 생성

import { Items } from "@/types/Item";
import { fetchItems } from "@/utils/riotApi";
import Image from "next/image";
export default async function ItemsPage() {
  //
  const items: Items = await fetchItems();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">아이템 목록</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {Object.entries(items).map(([key, item]) => (
          <li
            key={key}
            className="bg-black text-white rounded-2xl shadow-lg w-56 h-96 flex flex-col items-center justify-center p-4"
          >
            {/* 이미지 최적화 적용 */}
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${item.image.full}`}
                alt={item.name}
                fill // 부모 요소의 크기 채우기
                sizes="(max-width: 768px) 64px, 128px"
                className="object-contain" // 이미지 비율 유지
                priority
              />
            </div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-lolGold text-sm">{item.plaintext}</p>
            <p className="mt-2 text-sm text-lolGold font-medium">
              가격: {item.gold.total} 골드
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
