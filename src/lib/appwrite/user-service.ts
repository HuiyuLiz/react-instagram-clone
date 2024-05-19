import { Query } from 'appwrite'

import { isValueDefined } from '../utils'
import { appwriteConfig, databases } from './config'

export async function getUsers(limit?: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: any[] = [Query.orderDesc('$createdAt')]

  if (isValueDefined(limit)) {
    queries.push(Query.limit(limit))
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_USERS_ID,
      queries
    )

    if (!isValueDefined(users)) throw Error('Failed to get users')

    return users
  } catch (error) {
    console.log(error)
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_USERS_ID,
      userId
    )

    if (!isValueDefined(user)) throw Error('Failed to get user by ID')

    return user
  } catch (error) {
    console.log(error)
  }
}
