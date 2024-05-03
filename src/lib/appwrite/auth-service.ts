import { ID } from 'appwrite'

import { type SignUpFormValue } from './auth-service.type'
import { account, appwriteConfig, avatars, databases } from './config'

export const createUserAccount = async (user: SignUpFormValue) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if (newAccount === undefined || newAccount === null)
      throw Error('Failed to create account')

    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      name: user.name,
      email: user.email,
      username: user.username,
      imageUrl: avatarUrl
    })

    return newUser
  } catch (error) {
    console.log(error)
  }
}

export const saveUserToDatabase = async (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_USERS_ID,
      ID.unique(),
      user
    )
    return newUser
  } catch (error) {
    console.log(error)
  }
}
