import GridPostList from '@/components/shared/grid-post-list'
import UserCard from '@/components/shared/user-card'
import { useGetRecentPosts } from '@/lib/tanstack-query/post-query'
import { isValueDefined } from '@/lib/utils'

const Home = () => {
  const { data: posts, isPending: isPendingPosts } = useGetRecentPosts()

  return (
    <div className="grid grid-cols-[1fr_300px] gap-8">
      {isPendingPosts && !isValueDefined(posts) ? (
        <p>Loading...</p>
      ) : (
        <>
          {isValueDefined(posts) && posts.documents.length > 0 ? (
            <GridPostList posts={posts.documents} />
          ) : (
            <p>No Data.</p>
          )}

          <div className="space-y-4">
            <UserCard></UserCard>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
