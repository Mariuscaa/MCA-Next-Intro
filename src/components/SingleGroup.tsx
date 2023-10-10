import { useEffect, useState } from "react"
import axios from "axios"

import { type Group } from "@/lib/models/group"

export default function SingleGroup({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<Group>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = `http://localhost:3000/api/groups/${groupId}`
        const response = await axios.get(API_URL)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setGroup(response.data.data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }

    void fetchData()
  }, [groupId])

  return (
    <div className="mt-6 flex w-full p-6 pb-12">
      <div className="mx-auto rounded-lg border border-gray-200 bg-white p-6 pl-14 shadow dark:border-gray-700 dark:bg-gray-800">
        <h1 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
          {group?.groupName}
        </h1>
        <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
          Description
        </h2>
        <p className="mb-6">{group?.description}</p>

        <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
          PictureUrl
        </h2>
        <p className="mb-6">{group?.pictureUrl}</p>

        <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
          Privacy status
        </h2>
        <p className="mb-6">{group?.isPrivate ? "private" : "public"}</p>
      </div>
    </div>
  )
}
