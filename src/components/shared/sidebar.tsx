import { NavLink } from 'react-router-dom'

import InstagramIcon from '@/components/icon/instagramicon'
import { sidebarLinks } from '@/constants'

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
        <nav className="grid items-start space-y-2 px-4 text-sm font-medium">
          {sidebarLinks.map(link => {
            return (
              <NavLink
                key={link.label}
                to={link.route}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
