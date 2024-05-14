import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createPost,
  deleteSavedPost,
  getRecentPosts,
  likePost,
  savePost
} from '@/lib/appwrite/post-service'

import { type NewPost } from '../type'

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
