import { NextResponse } from "next/server"

import {
  deleteGroup,
  editGroup,
  findGroupById,
  type Group,
} from "@/lib/models/group"


export function GET(request: Request, context: { params: { id: string } }) {
  const groupId = context.params.id
  const group = findGroupById(groupId)

  if (group === null) {
    return NextResponse.json(
      { data: `No group found with id ${groupId}` },
      { status: 404 },
    )
  }

  return NextResponse.json({ data: group }, { status: 200 })
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const body = (await request.json()) as Group
  const groupId = context.params.id

  try {
    editGroup(groupId, body)
    return NextResponse.json({ data: body }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to edit group. Error: " + String(error) },
      { status: 400 },
    )
  }
}

export function DELETE(request: Request, context: { params: { id: string } }) {
  const groupId = context.params.id
  try {
    const deletedCompany = deleteGroup(groupId)
    return NextResponse.json({ data: deletedCompany }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete group. Error: " + String(error) },
      { status: 400 },
    )
  }
}
