import { useQuery } from '@tanstack/react-query'

import { getUserById, getUsers } from '../appwrite/user-service'

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: ['getUsers', limit],
    queryFn: async () => await getUsers(limit)
  })
}

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ['getUserById', userId],
    queryFn: async () => await getUserById(userId),
    enabled: !(userId.length === null)
  })
}
