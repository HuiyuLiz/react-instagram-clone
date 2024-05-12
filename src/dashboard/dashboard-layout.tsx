import { Outlet } from 'react-router-dom'

import Header from '@/components/shared/header'
import Sidebar from '@/components/shared/sidebar'

const DashboardLayout = () => {
  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar></Sidebar>
        <div className="flex flex-col space-y-8">
          <Header></Header>
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
