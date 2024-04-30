import CompassIcon from '@/components/icon/compassIcon'
import HeartIcon from '@/components/icon/hearticon'
import HomeIcon from '@/components/icon/homeicon'
import InstagramIcon from '@/components/icon/instagramicon'
import SearchIcon from '@/components/icon/searchicon'
import UserIcon from '@/components/icon/usericon'

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block">
      <div className="flex h-[60px] items-center px-6">
        <div className="flex items-center gap-2 font-semibold">
          <InstagramIcon className="h-6 w-6" />
          <span className="">Instagram</span>
        </div>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-4 text-sm font-medium">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
            <HomeIcon className="h-4 w-4" />
            Home
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
            <SearchIcon className="h-4 w-4" />
            Explore
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
            <CompassIcon className="h-4 w-4" />
            Discover
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
            <HeartIcon className="h-4 w-4" />
            Notifications
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
            <UserIcon className="h-4 w-4" />
            Profile
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
