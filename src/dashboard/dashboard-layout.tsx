import { Outlet } from 'react-router-dom'

import Header from '@/components/shared/header'
import Sidebar from '@/components/shared/sidebar'

const DashboardLayout = () => {
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
        <Sidebar></Sidebar>
        <div className="flex flex-col">
          <Header></Header>
          <div className="container mx-auto grid grid-cols-[1fr_300px] gap-8 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
