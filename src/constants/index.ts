import BookMarkIcon from '@/components/icon/bookmarkicon'
import CreateIcon from '@/components/icon/createicon'
import HomeIcon from '@/components/icon/homeicon'
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
    label: 'All Users'
  },
  {
    icon: BookMarkIcon,
    route: '/saved',
    label: 'Saved'
  },
  {
    icon: CreateIcon,
    route: '/create-post',
    label: 'Create Post'
  }
]
