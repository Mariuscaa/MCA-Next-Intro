"use client"

import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { type Group } from "@/lib/models/group"

export default function GroupList() {
  const [groupList, setGroupList] = useState<Group[]>([])
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "http://localhost:3000/api/groups"
        const response = await axios.get(API_URL)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setGroupList(response.data?.data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }

    void fetchData()
  }, [])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Group name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Picture
            </th>
            <th scope="col" className="px-6 py-3">
              isPrivate
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {groupList.map((item, index) => (
            <Fragment key={index}>
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 hover:underline dark:text-white"
                  onClick={() => {
                    router.push(`/groups/${item._id}`)
                  }}
                >
                  {item.groupName}
                </th>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.pictureUrl}</td>
                <td className="px-6 py-4">
                  {item.isPrivate ? "Private" : "Public"}
                </td>
                <td>
                  <button
                    onClick={() => {
                      // Create a copy of the groupList array without the current item
                      const updatedGroupList = [...groupList]
                      updatedGroupList.splice(index, 1)

                      // Set the state or update the data source with the updatedGroupList
                      setGroupList(updatedGroupList) // You may need to use state management or other methods to update the data source
                    }}
                    className="cursor-pointer px-6 py-4 text-red-700 transition-colors hover:bg-red-100 hover:text-red-800 active:bg-red-200 active:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
