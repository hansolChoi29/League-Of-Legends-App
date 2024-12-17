import { ChampionList } from "@/types/Champion";

// 챔피언 목록 가져오기 함수
export const fetchChampions = async (): Promise<ChampionList> => {
  try {
    const versionResponse = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const versions = await versionResponse.json();
    const latestVersion = versions[0];

    const championsResponse = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
    );
    const championsData = await championsResponse.json();
    console.log("챔피언 데이터:", championsData.data);
    return championsData.data;
  } catch (error) {
    console.error("챔피언 데이터를 가져오는 중 오류 발생:", error);
    throw new Error("챔피언 데이터를 가져오지 못했습니다.");
  }
};

export const fetchItems = async () => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/item.json"
  );
  if (!response) {
    throw new Error("아이템 가져오기 실패!");
  }
  const data = await response.json();
  return data.data;
};

export const getChampionRotation = async () => {
  const response = await fetch("/api/rotation");
  if (!response.ok) {
    throw new Error("로테이션 데이터 불러오기 실패!");
  }
  return response.json();
};
