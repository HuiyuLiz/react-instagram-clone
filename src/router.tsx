import { Outlet, createBrowserRouter } from 'react-router-dom'

import SigninForm from '@/components/forms/signin-form'
import SignupForm from '@/components/forms/signup-form'
import { Toaster } from '@/components/ui/toaster'
import DashboardLayout from '@/dashboard/dashboard-layout'

import AuthLayout from './auth/auth-layout'
import { AuthProvider } from './context/auth-context'
import { CreatePost, Home } from './dashboard/pages'

const AuthProviderLayout = () => (
  <AuthProvider>
    <Outlet />
    <Toaster />
  </AuthProvider>
)

const router = createBrowserRouter([
  {
    element: <AuthProviderLayout />,
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
            element: <Home />
          },
          {
            path: '/create-post',
            element: <CreatePost />
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
