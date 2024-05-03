import { createBrowserRouter } from 'react-router-dom'

import SigninForm from '@/components/forms/signin-form'
import SignupForm from '@/components/forms/signup-form'
import DashboardLayout from '@/dashboard/dashboard-layout'

import AuthLayout from './auth/auth-layout'
import Home from './dashboard/pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />
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
])

export default router
