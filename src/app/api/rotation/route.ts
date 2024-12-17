import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      console.error("API 요청 실패:", response.statusText);
      return NextResponse.json(
        { error: "API 호출 실패" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("서버 내부 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
