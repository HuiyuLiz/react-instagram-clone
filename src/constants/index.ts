import CompassIcon from '@/components/icon/compassIcon'
import HomeIcon from '@/components/icon/homeicon'
import PlusIcon from '@/components/icon/plusIcon'
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
    icon: CompassIcon,
    route: '/saved',
    label: 'Saved'
  },
  {
    icon: PlusIcon,
    route: '/create-post',
    label: 'Create Post'
  }
]
