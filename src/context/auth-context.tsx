import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCurrentUser } from '@/lib/appwrite/auth-service'
import { type User } from '@/lib/type'

interface AuthState {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isLoading: boolean
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuth: () => Promise<boolean>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const initUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: ''
}

const AuthContext = React.createContext<AuthState>({
  user: initUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuth: async () => false as boolean
})

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>(initUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuth = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()
      if (currentAccount !== undefined && currentAccount !== null) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuth
  }

  useEffect(() => {
    const cookie = localStorage.getItem('cookieFallback')
    if (cookie === '[]' || cookie === null || cookie === undefined) {
      navigate('/sign-in')
    }
    void checkAuth()
  }, [navigate])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within ')
  }
  return context
}

export { AuthProvider, useAuthContext }
