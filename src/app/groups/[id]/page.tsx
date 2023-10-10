"use client"

import { useRouter } from "next/navigation"

import SingleGroup from "@/components/SingleGroup"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SingleGroup groupId={params.id} />
      <button
        type="button"
        onClick={() => {
          router.push("/groups")
        }}
        className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Return to list
      </button>
    </main>
  )
}
