/* eslint-disable react/jsx-max-props-per-line */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import HeartIcon from '@/components/icon/hearticon'
import { MobileSidebar } from '@/components/shared/mobile-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuthContext } from '@/context/auth-context'
import { useSignOutAccount } from '@/lib/tanstack-query/auth-query'

const Header = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const { mutateAsync: signOut, isSuccess } = useSignOutAccount()

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess, navigate])
  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex h-14 items-center justify-between border-b bg-background/95 bg-white px-4 backdrop-blur lg:left-[280px]">
      <div className="block lg:!hidden">
        <MobileSidebar />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" className="rounded-full" size="icon" asChild>
          <Link to={'/liked'}>
            <HeartIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigate('/profile/' + user.id)
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                void signOut()
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
