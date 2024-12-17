import { Champion } from "./Champion";

// // 챔피언 로테이션 데이터를 위한 타입 정의
export type ChampionBase = Pick<Champion, "id" | "name" | "title" | "key">;
export interface ChampionRotation {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
}
