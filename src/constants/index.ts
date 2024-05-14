import BookMarkIcon from '@/components/icon/bookmarkicon'
import HomeIcon from '@/components/icon/homeicon'
import PlusIcon from '@/components/icon/plusicon'
import SearchIcon from '@/components/icon/searchicon'
import UserIcon from '@/components/icon/usericon'

export const sidebarLinks = [
  {
    icon: HomeIcon,
    route: '/',
    label: 'Home'
  },
  {
    icon: SearchIcon,
    route: '/explore',
    label: 'Explore'
  },
  {
    icon: UserIcon,
    route: '/all-users',
    label: 'People'
  },
  {
    icon: BookMarkIcon,
    route: '/saved',
    label: 'Saved'
  },
  {
    icon: PlusIcon,
    route: '/create-post',
    label: 'Create Post'
  }
]
