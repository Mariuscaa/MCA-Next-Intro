import type { Group } from "@/lib/models/group"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { findAllGroups, findGroupsByName } from "@/lib/models/group"

export function GET({ nextUrl }: NextRequest) {
  const groupName = nextUrl.searchParams.get("groupName")
  const groups = groupName ? findGroupsByName(groupName) : findAllGroups()

  return NextResponse.json({ data: groups }, { status: 200 })
}

export async function POST(request: Request) {
  const body = await request.json()

  const group: Group = body as Group

  // eslint-disable-next-line no-console
  console.log(group)

  return NextResponse.json({ data: group }, { status: 200 })
}
