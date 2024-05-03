import { Account, Avatars, Client, Databases, Storage } from 'appwrite'

import { env } from '../env'

export const appwriteConfig = {
  ENDPOINT: env.VITE_APPWRITE_ENDPOINT,
  PROJECT_ID: env.VITE_APPWRITE_PROJECT_ID,
  DATABASE_ID: env.VITE_APPWRITE_DATABASE_ID,
  STORAGE_MEDIA_ID: env.VITE_APPWRITE_STORAGE_MEDIA_ID,
  COLLECTION_POSTS_ID: env.VITE_APPWRITE_COLLECTION_POSTS_ID,
  COLLECTION_USERS_ID: env.VITE_APPWRITE_COLLECTION_USERS_ID,
  COLLECTION_SAVES_ID: env.VITE_APPWRITE_COLLECTION_SAVES_ID
}

export const client: Client = new Client()
client
  .setEndpoint(appwriteConfig.ENDPOINT)
  .setProject(appwriteConfig.PROJECT_ID)

export const account: Account = new Account(client)
export const databases: Databases = new Databases(client)
export const storages: Storage = new Storage(client)
export const avatars: Avatars = new Avatars(client)
