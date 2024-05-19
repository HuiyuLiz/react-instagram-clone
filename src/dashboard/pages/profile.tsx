import { useParams } from 'react-router-dom'

import ErrorMessage from '@/components/loader/error-message'
import Loading from '@/components/loader/loading'
import GridPostList from '@/components/shared/grid-post-list'
import { Heading } from '@/components/shared/heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetUserById } from '@/lib/tanstack-query/user-query'
import { isValueDefined } from '@/lib/utils'

const Profile = () => {
  const { id } = useParams()
  const { data: currentUser, isPending } = useGetUserById(id!)

  if (isPending) {
    return <Loading></Loading>
  } else if (isValueDefined(currentUser)) {
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
        <div className="max-w-5xl">
          {currentUser.posts.length > 0 ? (
            <GridPostList posts={currentUser.posts} />
          ) : (
            <ErrorMessage message="No posts found."></ErrorMessage>
          )}
        </div>
      </div>
    )
  } else {
    return <Heading title="User not found."></Heading>
  }
}

export default Profile
