import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Riot API 호출
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY || "", // API 키 환경변수 사용
        },
      }
    );

    // API 응답 확인
    if (!response.ok) {
      console.error("Riot API 호출 실패:", response.status);
      return NextResponse.json(
        { error: "Failed to fetch champion rotation data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data); // 성공적으로 데이터 반환
  } catch (error) {
    console.error("API Route 내부 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
