"use client"

import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { type Group } from "@/lib/models/group"

export default function GroupList() {
  const [groupList, setGroupList] = useState<Group[]>([])
  const [openAddCard, setOpenAddCard] = useState(false)
  const [id, setId] = useState("")
  const [groupName, setGroupName] = useState("")
  const [description, setDescription] = useState("")
  const [pictureUrl, setPictureUrl] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const [error, setError] = useState("")
  const [status, setStatus] = useState("")

  const handleAddCardReset = () => {
    setGroupName("")
    setId("")
    setDescription("")
    setPictureUrl("")
    setIsPrivate(false)
    setOpenAddCard(false)
  }

  const handleAddGroupToList = () => {
    const tempList = groupList
    const newGroup: Group = {
      _id: id,
      groupName: groupName,
      description: description,
      pictureUrl: pictureUrl,
      isPrivate: isPrivate,
    }
    tempList.push(newGroup)
    setGroupList(tempList)
  }

  const handleSubmit = async () => {
    const payload = {
      _id: id,
      groupName: groupName,
      description: description,
      pictureUrl: pictureUrl,
      isPrivate: isPrivate,
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/groups",
        payload,
      )
      if (response.status == 200) {
        handleAddGroupToList()
        setStatus("New group was saved")
        handleAddCardReset()
      } else {
        setError("Something went wrong. Try to submit something else.")
      }
    } catch (error) {
      setError("Something went wrong. Error: " + String(error))
    }
  }

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
    <div className="relative flex flex-col items-center justify-center overflow-x-auto shadow-md sm:rounded-lg">
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
                      const updatedGroupList = [...groupList]
                      updatedGroupList.splice(index, 1)

                      setGroupList(updatedGroupList)
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

      {openAddCard ? (
        <>
          <div className="mb-6 mt-6 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
            <h1 className="mb-6 text-2xl font-bold dark:text-white">
              Fill out the information about the group
            </h1>

            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Group id (Would be automatic if connected to db)
              </label>
              <input
                value={id}
                onChange={(e) => {
                  setId(e.target.value)
                }}
                type="text"
                id="default-input"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Group name
              </label>
              <input
                onChange={(e) => {
                  setGroupName(e.target.value)
                }}
                value={groupName}
                type="text"
                id="default-input"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                value={description}
                type="text"
                id="default-input"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Picture url
              </label>
              <input
                onChange={(e) => {
                  setPictureUrl(e.target.value)
                }}
                value={pictureUrl}
                type="text"
                id="default-input"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <span className="mb-6 flex-row items-center">
              <label
                htmlFor="default-input"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Should the group be private?
              </label>
              <input
                onChange={(e) => {
                  setIsPrivate(e.target.checked)
                }}
                checked={isPrivate}
                type="checkbox"
                id="checkbox"
                className="ml-3 text-sm font-medium text-gray-900 dark:text-white"
              />
            </span>
            <button
              type="button"
              onClick={() => {
                void handleSubmit()
              }}
              className="mx-auto mb-2 mt-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Lagre ny gruppe
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            setOpenAddCard(true)
          }}
          className="mx-auto mb-2 mt-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Legg til ny gruppe
        </button>
      )}
      <div className="">
        {status && <p className="text-green-500">{status}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  )
}
