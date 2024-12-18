// // // 챔피언 로테이션 정보 페이지, CSR 방식으로 클라이언트에서 데이터 가져오기
// // // 자주 변경돼서 csr방식으로 해야 됨.

// // "use client";
// // // csr을 쓸 때 useState, useEffect필수인 줄 알고 useQuery 시 useEffect에 대한
// // // 고민을 했는데,
// // // use client  사용 시 csr요건을 충족되기 때문에 useEffect 없어도
// // // csr로 된다.
// // import { Champion } from "@/types/Champion";
// // import { ChampionRotation } from "@/types/ChampionRotation";
// // import { useQuery } from "@tanstack/react-query";
// // import { useState } from "react";
// // import Image from "next/image";
// // import { getChampionRotation } from "@/utils/riotApi";
// // export default function RotationPage() {
// //   // const [rotationData, setRotationData] =
// //   //   useState<ChampionRotationsData | null>(null);

// //   // const [loading, setLoading] = useState(true);
// //   // const [error, setError] = useState<string | null>(null);

// //   const {
// //     data: rotationData,
// //     isPending,
// //     isError,
// //   } = useQuery({
// //     queryKey: ["championRotation"],
// //     queryFn: async () => {
// //       const response = await fetch("/api/rotation");
// //       return response.json();
// //     },
// //   });
// //   const { data: championData, isPending: isChampPending } = useQuery({
// //     queryKey: ["champions"],
// //     queryFn: async () => {
// //       const response = await fetch(
// //         "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
// //       );
// //       const { data } = await response.json();
// //       return data;
// //     },
// //   });

// //   if (isPending || isChampPending) return <div>로딩중...</div>;
// //   if (isError || !championData) return <div>에러 발생!</div>;
// //   // useEffect(() => {
// //   //   async function fetchRotationData() {
// //   //     try {
// //   //       // 로테이션 데이터 가져오기
// //   //       const rotationRes = await fetch("/api/rotation");
// //   //       if (!rotationRes.ok)
// //   //         throw new Error("로테이션 데이터를 가져오는데 실패했습니다.");
// //   //       const rotation: ChampionRotation = await rotationRes.json();
// //   //       setChampionData(rotation);

// //   //       // 챔피언 데이터 가져오기
// //   //       const championsRes = await fetch(
// //   //         "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
// //   //       );
// //   //       if (!championsRes.ok)
// //   //         throw new Error("챔피언 데이터를 가져오는데 실패했습니다.");
// //   //       const { data: champions }: { data: Record<string, Champion> } =
// //   //         await championsRes.json();
// //   //       setChampionData(champions);
// //   //     } catch (err) {
// //   //       console.error("에러발생!");
// //   //     }
// //   //   }

// //   //   fetchRotationData();
// //   // }, []);

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-6">로테이션 챔피언</h1>
// //       <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
// //         {rotationData.freeChampionIds.map((id: any) => {
// //           const champ = Object.values(championData).find(
// //             (champion) => parseInt(champion.key) === id
// //           );
// //           if (!champ) return null;

// //           return (
// //             <li
// //               key={id}
// //               className="border rounded-lg p-4 shadow-md text-center"
// //             >
// //               <Image
// //                 src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
// //                 alt={champ.name}
// //                 width={120}
// //                 height={120}
// //                 className="mx-auto mb-2"
// //               />
// //               <p className="font-bold">{champ.name}</p>
// //               <p className="text-sm text-gray-500">{champ.title}</p>
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </div>
// //   );
// // }
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Champion } from "@/types/Champion";
// import Image from "next/image";
// import { ChampionRotation } from "@/types/ChampionRotation";

// async function fetchChampionRotation(): Promise<ChampionRotation> {
//   const response = await fetch("/api/rotation");
//   if (!response.ok)
//     throw new Error("로테이션 데이터를 가져오는데 실패했습니다.");
//   return response.json();
// }

// async function fetchChampionData(): Promise<Record<string, Champion>> {
//   const response = await fetch(
//     "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
//   );
//   if (!response.ok) throw new Error("챔피언 데이터를 가져오는데 실패했습니다.");
//   const data = await response.json();
//   return data.data;
// }

// export default function RotationPage() {
//   const { data: rotationData, isError: isRotationError } = useQuery({
//     queryKey: ["championRotation"],
//     queryFn: fetchChampionRotation,
//   });

//   const { data: championData, isError: isChampionError } = useQuery({
//     queryKey: ["championData"],
//     queryFn: fetchChampionData,
//   });

//   // if (isRotationError || isChampionError)
//   //   return <p>데이터를 가져오는데 실패했습니다.</p>;
//   // if (!rotationData || !championData) return <p>데이터를 찾을 수 없습니다.</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">로테이션 챔피언</h1>
//       <ul className="flex flex-wrap justify-center gap-4">
//         {rotationData.freeChampionIds.map((id) => {
//           const champ = Object.values(championData).find(
//             (champion) => parseInt(champion.key) === id
//           );
//           if (!champ) return null;

//           return (
//             <li
//               key={id}
//               className="bg-black text-white rounded-2xl shadow-lg w-56 h-96 flex flex-col items-center justify-center p-4"
//             >
//               <Image
//                 src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
//                 alt={champ.name}
//                 width={120}
//                 height={120}
//                 className="mx-auto mb-2"
//               />
//               <p className="font-bold">{champ.name}</p>
//               <p className="text-sm text-gray-500">{champ.title}</p>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
"use client";

import { Suspense } from "react";
import RotationContent from "@/components/RotationContent";

export default function RotationPage() {
  return (
    <Suspense>
      <RotationContent />
    </Suspense>
  );
}
