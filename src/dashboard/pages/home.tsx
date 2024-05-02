import ImageCard from '@/components/shared/image-card'
import UserCard from '@/components/shared/user-card'

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <ImageCard></ImageCard>
      </div>
      <div className="space-y-4">
        <UserCard></UserCard>
      </div>
    </>
  )
}

export default Home
