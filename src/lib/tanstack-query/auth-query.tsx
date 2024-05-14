import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createUserAccount,
  getCurrentUser,
  signOutAccount,
  signinAccount
} from '@/lib/appwrite/auth-service'

import { type NewUser, type SignInParams } from '../type'

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: async (user: NewUser) => await createUserAccount(user)
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: async (user: SignInParams) => await signinAccount(user)
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount
  })
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser
  })
}
