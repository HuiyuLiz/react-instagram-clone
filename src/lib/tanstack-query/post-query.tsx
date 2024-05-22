/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import {
  createPost,
  deletePost,
  deleteSavedPost,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  likePost,
  savePost,
  searchPosts,
  updatePost
} from '@/lib/appwrite/post-service'

import { type NewPost, type UpdatePost } from '../type'
import { isValueDefined } from '../utils'

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

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ['getInfinitePosts'],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any) => {
      // If there's no data, there are no more pages.
      if (isValueDefined(lastPage) && lastPage.documents.length === 0) {
        return null
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id
      return lastId
    },
    initialPageParam: undefined
  })
}

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: ['searchPosts', searchTerm],
    queryFn: async () => await searchPosts(searchTerm),
    enabled: !(searchTerm.length === 0)
  })
}
