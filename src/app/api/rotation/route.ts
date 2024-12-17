import { NextResponse } from "next/server";
//  http://localhost:3000/api/rotation 접속하여 데이터 잘 나오는지
//확인함. 잘나옴

export async function GET() {
  try {
    // Riot API 호출
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      console.error("Riot API 호출 실패:", response.status);
      return NextResponse.json(
        { error: "Failed to fetch champion rotation data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data); // 클라이언트에 데이터 반환
  } catch (error) {
    console.error("API Route 내부 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
