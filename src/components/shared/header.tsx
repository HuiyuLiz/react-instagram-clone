import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import HeartIcon from '@/components/icon/hearticon'
import MessageCircleIcon from '@/components/icon/messagecircleicon'
import SearchIcon from '@/components/icon/searchicon'
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
import { Input } from '@/components/ui/input'
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
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="relative flex w-full max-w-md items-center">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
          placeholder="Search"
          type="search"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button className="rounded-full" size="icon" variant="ghost">
          <HeartIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MessageCircleIcon className="h-5 w-5" />
          <span className="sr-only">Messages</span>
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
