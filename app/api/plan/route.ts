import { NextResponse } from "next/server"
import { generateRaceEngine } from "@/lib/engine/raceEngine"
import { buildRaceUiResponse } from "@/lib/presenters/racePresenter"

export async function POST(req: Request) {
  const body = await req.json()

  const locale =
    body.locale === "vi" ? "vi" : "en"

  const engine = generateRaceEngine(body)

  const response = buildRaceUiResponse(
    engine,
    body,
    locale
  )

  return NextResponse.json(response)
}