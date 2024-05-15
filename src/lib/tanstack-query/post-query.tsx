import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createPost,
  deletePost,
  deleteSavedPost,
  getPostById,
  getRecentPosts,
  likePost,
  savePost,
  updatePost
} from '@/lib/appwrite/post-service'

import { type NewPost, type UpdatePost } from '../type'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (post: NewPost) => await createPost(post),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getRecentPosts'] })
    }
  })
}

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: ['getRecentPosts'],
    queryFn: getRecentPosts
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      postId,
      likesArray
    }: {
      postId: string
      likesArray: string[]
    }) => await likePost(postId, likesArray),
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: ['getPostById', data?.$id]
      })
      void queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      })
      void queryClient.invalidateQueries({
        queryKey: ['getPosts']
      })
      void queryClient.invalidateQueries({
        queryKey: ['getCurrentUser']
      })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      postId
    }: {
      userId: string
      postId: string
    }) => await savePost(userId, postId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      })
      void queryClient.invalidateQueries({
        queryKey: ['getPosts']
      })
      void queryClient.invalidateQueries({
        queryKey: ['getCurrentUser']
      })
    }
  })
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (savedRecordId: string) =>
      await deleteSavedPost(savedRecordId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      })
      void queryClient.invalidateQueries({
        queryKey: ['getPosts']
      })
      void queryClient.invalidateQueries({
        queryKey: ['getCurrentUser']
      })
    }
  })
}

export const useGetPostById = (postId?: string) => {
  return useQuery({
    queryKey: ['getPostById', postId],
    queryFn: async () => await getPostById(postId),
    enabled: !(postId === null)
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (post: UpdatePost) => await updatePost(post),
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: ['getPostById', data?.$id]
      })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      postId,
      imageId
    }: {
      postId?: string
      imageId: string
    }) => await deletePost(postId, imageId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      })
    }
  })
}
