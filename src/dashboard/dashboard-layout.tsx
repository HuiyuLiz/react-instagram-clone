import { Outlet } from 'react-router-dom'

import Header from '@/components/shared/header'
import Sidebar from '@/components/shared/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

const DashboardLayout = () => {
  return (
    <div className="grid h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <Header></Header>
      <Sidebar />
      <ScrollArea className="h-full w-full pt-8">
        <div className="container py-16">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  )
}

export default DashboardLayout
