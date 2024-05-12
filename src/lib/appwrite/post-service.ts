import { ID } from 'appwrite'

import { type NewPost } from '../type'
import { isValueDefined } from '../utils'
import { appwriteConfig, databases, storage } from './config'

export async function createPost(post: NewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0])

    if (!isValueDefined(uploadedFile)) throw Error('Failed to upload file')

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!isValueDefined(fileUrl)) {
      await deleteFile(uploadedFile.$id)
      throw Error('Failed to upload file')
    }

    // Convert tags into array
    const tags = isValueDefined(post.tags)
      ? post.tags?.map(tag => tag.text)
      : []

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags
      }
    )

    if (!isValueDefined(newPost)) {
      await deleteFile(uploadedFile.$id)
      throw Error('Failed to create post')
    }

    return newPost
  } catch (error) {
    console.log(error)
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.STORAGE_MEDIA_ID,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (error) {
    console.log(error)
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.STORAGE_MEDIA_ID, // bucket ID
      fileId, // file ID
      1800, // width, will be resized using this value.
      0, // height, ignored when 0
      'center', // crop center
      '90', // slight compression
      5, // border width
      'CDCA30', // border color
      15, // border radius
      1, // full opacity
      0, // no rotation
      'FFFFFF', // background color
      'jpg' // output jpg format
    )

    if (!isValueDefined(fileUrl)) throw Error('Failed to get file preview')

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.STORAGE_MEDIA_ID, fileId)

    return { status: 'ok' }
  } catch (error) {
    console.log(error)
  }
}
