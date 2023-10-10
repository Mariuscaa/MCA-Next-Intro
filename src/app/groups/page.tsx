"use client"

import GroupList from "@/components/GroupList"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1 className="mb-4 text-4xl">Admin page for handling groups</h1>
        <h2 className="mb-4 text-lg">
          Working functionality: Add (POST), Delete(DELETE), GET all (/groups) and GET single (groups/id).
        </h2>
        <h3 className="mb-4 text-base">
          Patch and search endpoints have been made but not in GUI (yet).
        </h3>
      </div>
      <GroupList />
    </main>
  )
}
