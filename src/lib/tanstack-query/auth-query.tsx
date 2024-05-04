import { useMutation } from '@tanstack/react-query'

import { createUserAccount, signinAccount } from '@/lib/appwrite/auth-service'

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
