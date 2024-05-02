import Header from '@/components/shared/header'
import ImageCard from '@/components/shared/image-card'
import Sidebar from '@/components/shared/sidebar'

import UserCard from './components/shared/user-card'

const Root = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col">
        <Header></Header>
        <div className="container mx-auto grid grid-cols-[1fr_300px] gap-8 py-8">
          <div className="grid grid-cols-3 gap-4">
            <ImageCard></ImageCard>
          </div>
          <div className="space-y-4">
            <UserCard></UserCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Root
