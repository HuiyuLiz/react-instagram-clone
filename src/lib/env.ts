import { z } from 'zod'

const envSchema = z.object({
  VITE_APPWRITE_ENDPOINT: z.string(),
  VITE_APPWRITE_PROJECT_ID: z.string(),
  VITE_APPWRITE_DATABASE_ID: z.string(),
  VITE_APPWRITE_STORAGE_MEDIA_ID: z.string(),
  VITE_APPWRITE_COLLECTION_POSTS_ID: z.string(),
  VITE_APPWRITE_COLLECTION_USERS_ID: z.string(),
  VITE_APPWRITE_COLLECTION_SAVES_ID: z.string()
})

export const env = envSchema.parse(import.meta.env)
