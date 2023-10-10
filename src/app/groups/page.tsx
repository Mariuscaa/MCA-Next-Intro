"use client"

import GroupList from "@/components/GroupList"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-4 text-lg">Admin page for handling groups</h1>
      <GroupList />
    </main>
  )
}
