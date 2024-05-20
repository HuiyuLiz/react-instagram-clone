import { type Dispatch, type SetStateAction } from 'react'
import { NavLink } from 'react-router-dom'

import { sidebarLinks } from '@/constants'
import { isValueDefined } from '@/lib/utils'

import InstagramIcon from '../icon/instagramicon'

interface NavLinkProps {
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const NavLinks = ({ setOpen }: NavLinkProps) => {
  return (
    <div>
      <div className="flex h-[60px] items-center px-6">
        <div className="flex items-center gap-2 font-semibold">
          <InstagramIcon className="h-6 w-6" />
          <span className="">Instagram Clone</span>
        </div>
      </div>
      <div className="flex-1">
        <nav className="grid items-start space-y-2 px-4 text-base font-medium lg:text-sm">
          {sidebarLinks.map(link => {
            return (
              <NavLink
                key={link.label}
                to={link.route}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={() => {
                  if (isValueDefined(setOpen)) setOpen(false)
                }}
              >
                <link.icon className="h-5 w-5 lg:h-4 lg:w-4" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default NavLinks
