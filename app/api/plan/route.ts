import { NextResponse } from "next/server"
import { generateRaceEngine } from "@/lib/engine/raceEngine"
import { buildRaceUiResponse } from "@/lib/presenters/racePresenter"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const engine = generateRaceEngine(body)
    const response = buildRaceUiResponse(engine, body)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Plan API error:", error)

    return NextResponse.json(
      {
        error: "Failed to generate race plan",
      },
      {
        status: 500,
      }
    )
  }
}