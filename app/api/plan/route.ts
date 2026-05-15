import { NextResponse } from "next/server"
import { generateRacePlan } from "@/lib/engine/raceEngine"

export async function POST(req: Request) {
  const body = await req.json()

  const result = generateRacePlan(body)

  return NextResponse.json(result)
}