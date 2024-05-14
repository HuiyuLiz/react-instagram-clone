import { ID, Query } from 'appwrite'

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

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if (!isValueDefined(posts)) throw Error('Failed to get recent posts')

    return posts
  } catch (error) {
    console.log(error)
  }
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      postId,
      {
        likes: likesArray
      }
    )

    if (!isValueDefined(updatedPost)) throw Error('Failed to update post')

    return updatedPost
  } catch (error) {
    console.log(error)
  }
}

export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_SAVES_ID,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )

    if (!isValueDefined(updatedPost)) throw Error('Failed to save post')

    return updatedPost
  } catch (error) {
    console.log(error)
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_SAVES_ID,
      savedRecordId
    )

    if (!isValueDefined(statusCode)) throw Error('Failed to delete saved post')

    return { status: 'Ok' }
  } catch (error) {
    console.log(error)
  }
}
