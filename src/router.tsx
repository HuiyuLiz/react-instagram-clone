import { Outlet, createBrowserRouter } from 'react-router-dom'

import SigninForm from '@/components/forms/signin-form'
import SignupForm from '@/components/forms/signup-form'
import { Toaster } from '@/components/ui/toaster'
import DashboardLayout from '@/dashboard/dashboard-layout'

import AuthLayout from './auth/auth-layout'
import { AuthProvider } from './context/auth-context'
import {
  CreatePost,
  EditPost,
  Error,
  Explore,
  Home,
  LikedPosts,
  Post,
  Profile,
  Saved,
  Users
} from './dashboard/pages'

const AuthProviderLayout = () => (
  <AuthProvider>
    <Outlet />
    <Toaster />
  </AuthProvider>
)

const router = createBrowserRouter([
  {
    element: <AuthProviderLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: '/posts/:id',
            element: <Post />
          },
          {
            path: '/create-post',
            element: <CreatePost />
          },
          {
            path: '/update-post/:id',
            element: <EditPost />
          },
          {
            path: '/explore',
            element: <Explore />
          },
          {
            path: '/all-users',
            element: <Users />
          },
          {
            path: '/saved',
            element: <Saved />
          },
          {
            path: '/liked',
            element: <LikedPosts />
          },
          {
            path: '/profile/:id/*',
            element: <Profile />
          }
        ]
      },
      {
        path: '/sign-in',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <SigninForm />
          }
        ]
      },
      {
        path: '/sign-up',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <SignupForm />
          }
        ]
      }
    ]
  }
])

export default router
