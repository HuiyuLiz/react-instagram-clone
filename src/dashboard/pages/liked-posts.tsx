import Loading from '@/components/loader/loading'
import GridPostList from '@/components/shared/grid-post-list'
import { Heading } from '@/components/shared/heading'
import { useGetCurrentUser } from '@/lib/tanstack-query/auth-query'
import { isValueDefined } from '@/lib/utils'

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser()

  return (
    <div className="space-y-8">
      <Heading title="Liked Posts"></Heading>

      {!isValueDefined(currentUser) ? (
        <Loading />
      ) : (
        <ul className="flex w-full max-w-5xl justify-center gap-9">
          {currentUser.liked.length === 0 ? (
            <p className="text-light-4">No liked posts.</p>
          ) : (
            <GridPostList posts={currentUser.liked} />
          )}
        </ul>
      )}
    </div>
  )
}

export default LikedPosts
