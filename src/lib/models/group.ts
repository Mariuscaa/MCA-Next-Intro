export type Group = {
  _id: string
  groupName: string
  description: string
  pictureUrl: string
  isPrivate: boolean
}

export const dummyGroups: Group[] = [
  {
    _id: "1",
    groupName: "Fantasy Quest Guild",
    description:
      "A guild for adventurers seeking epic quests in a fantasy world.",
    pictureUrl: "https://example.com/fantasyguild.jpg",
    isPrivate: false,
  },
  {
    _id: "2",
    groupName: "Sci-Fi Gamers United",
    description:
      "Join us in exploring the futuristic worlds of science fiction games.",
    pictureUrl: "https://example.com/scifigamers.jpg",
    isPrivate: false,
  },
  {
    _id: "3",
    groupName: "Casual Gamers Hangout",
    description:
      "Relax and have fun with fellow gamers in a laid-back environment.",
    pictureUrl: "https://example.com/casualgamers.jpg",
    isPrivate: false,
  },
  {
    _id: "4",
    groupName: "Pro eSports League",
    description:
      "Compete at the highest level in professional eSports tournaments.",
    pictureUrl: "https://example.com/proesports.jpg",
    isPrivate: true,
  },
]

export function findGroupById(groupId: string | null): Group | null {
  const group = dummyGroups.find((g) => g._id === groupId)
  return group ?? null
}

export function findAllGroups(): Group[] {
  return dummyGroups
}

export function findGroupsByName(groupName: string): Group[] {
  const regex = new RegExp(groupName, "i")
  return dummyGroups.filter((group) => regex.test(group.groupName))
}

export function createGroup(newGroup: Group): void {
  dummyGroups.push(newGroup)
}

export function editGroup(
  groupId: string,
  updatedData: Partial<Group>,
): Group | null {
  const groupIndex = dummyGroups.findIndex((group) => group._id === groupId)

  if (groupIndex === -1) {
    return null
  }

  dummyGroups[groupIndex] = { ...dummyGroups[groupIndex], ...updatedData }
  return dummyGroups[groupIndex]
}

export function deleteGroup(groupId: string): Group | null {
  const groupIndex = dummyGroups.findIndex((group) => group._id === groupId)

  if (groupIndex === -1) {
    return null
  }

  const deletedGroup = dummyGroups.splice(groupIndex, 1)[0]
  return deletedGroup
}
