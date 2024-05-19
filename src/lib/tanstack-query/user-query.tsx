import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../appwrite/post-service'

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: ['getUsers', limit],
    queryFn: async () => await getUsers(limit)
  })
}
