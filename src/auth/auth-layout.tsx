import { Navigate, Outlet } from 'react-router-dom'

import InstagramIcon from '@/components/icon/instagramicon'
import { useAuthContext } from '@/context/auth-context'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthContext()

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg">
            <div className="flex items-center gap-2 font-semibold">
              <InstagramIcon className="h-6 w-6" />
              <span className="">Instagram Clone</span>
            </div>
          </div>
        </div>
        <div className="flex h-full items-center p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
