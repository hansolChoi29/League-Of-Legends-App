// 아이템 데이터를 위한 타입 정의
export interface Items {
  id: string;
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into?: string[];
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: { [key: string]: boolean };
  stats: {
    FlatMovementSpeedMod: number;
  };
}
export type PartialItem = Partial<Items>;
export type ItemImage = Pick<Items["image"], "full" | "sprite" | "group">;
export type ItemGold = Pick<Items["gold"], "total" | "sell">;
