import { useMutation } from '@tanstack/react-query'

import { createPost } from '@/lib/appwrite/post-service'

import { type NewPost } from '../type'

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (post: NewPost) => await createPost(post)
  })
}
