import { ID } from 'appwrite'

import { type NewUser, type SaveUserParams, type SignInParams } from '../type'
import { account, appwriteConfig, avatars, databases } from './config'

export const createUserAccount = async (user: NewUser) => {
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

export const saveUserToDatabase = async (user: SaveUserParams) => {
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

export const signinAccount = async (user: SignInParams) => {
  const { email, password } = user
  try {
    const loggedIn = await account.createEmailPasswordSession(email, password)
    return loggedIn
  } catch (error) {
    console.log(error)
  }
}
