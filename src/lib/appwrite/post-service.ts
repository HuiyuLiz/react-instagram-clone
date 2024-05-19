import { ID, Query } from 'appwrite'

import { type NewPost, type UpdatePost } from '../type'
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

export async function updatePost(post: UpdatePost) {
  const hasFileToUpdate = post.file.length > 0

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0])
      if (!isValueDefined(uploadedFile)) throw Error('Failed to upload file')

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id)
      if (!isValueDefined(fileUrl)) {
        await deleteFile(uploadedFile.$id)
        throw Error('Failed to upload file')
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
    }

    // Convert tags into array
    const tags = Array.isArray(post.tags)
      ? post.tags.map((tag: { id: string; text: string }) => tag.text)
      : []

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags
      }
    )

    // Failed to update
    if (!isValueDefined(updatedPost)) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId)
      }

      // If no new file uploaded, just throw error
      throw Error('Failed to update post')
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId)
    }

    return updatedPost
  } catch (error) {
    console.log(error)
  }
}

export async function deletePost(postId?: string, imageId?: string) {
  if (!isValueDefined(postId) || !isValueDefined(imageId)) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      postId
    )

    if (!isValueDefined(statusCode)) throw Error('Failed to delete post')

    await deleteFile(imageId)

    return { status: 'Ok' }
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
      fileId,
      2000,
      2000,
      'top',
      100
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

export async function getPostById(postId?: string) {
  if (!isValueDefined(postId)) throw Error('Post ID is required')

  try {
    const post = await databases.getDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      postId
    )

    if (!isValueDefined(post)) throw Error('Failed to get post by ID')

    return post
  } catch (error) {
    console.log(error)
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      [Query.search('caption', searchTerm)]
    )

    if (!isValueDefined(posts)) throw Error('Failed to search posts')

    return posts
  } catch (error) {
    console.log(error)
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(9)]

  if (isValueDefined(pageParam)) {
    queries.push(Query.cursorAfter(pageParam.toString()))
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.COLLECTION_POSTS_ID,
      queries
    )

    if (!isValueDefined(posts)) throw Error('Failed to get posts')

    return posts
  } catch (error) {
    console.log(error)
  }
}
