import { useParams } from 'react-router-dom'

import Loading from '@/components/loader/loading'
import GridPostList from '@/components/shared/grid-post-list'
import { Heading } from '@/components/shared/heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetUserById } from '@/lib/tanstack-query/user-query'
import { isValueDefined } from '@/lib/utils'

const Profile = () => {
  const { id } = useParams()
  const { data: currentUser } = useGetUserById(id!)

  if (!isValueDefined(currentUser))
    return <Heading title="User not found."></Heading>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-start space-x-4">
        <Avatar className="lg:h-16 lg:w-16">
          <AvatarImage
            alt="@shadcn"
            src={currentUser?.imageUrl ?? '/placeholder-avatar.jpg'}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Heading
          title={currentUser?.username}
          description={'@' + currentUser?.username}
        ></Heading>
      </div>
      {!isValueDefined(currentUser) ? (
        <Loading />
      ) : (
        <>
          <ul className="flex w-full max-w-5xl justify-center gap-9">
            {currentUser.posts.length === 0 ? (
              <p className="text-light-4">No posts found.</p>
            ) : (
              <>
                <GridPostList posts={currentUser.posts} />
              </>
            )}
          </ul>
        </>
      )}
    </div>
  )
}

export default Profile
