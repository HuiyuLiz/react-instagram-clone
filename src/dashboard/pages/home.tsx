import Loading from '@/components/loader/loading'
import UserCardSkeleton from '@/components/loader/user-card-skeleton'
import GridPostList from '@/components/shared/grid-post-list'
import UserCard from '@/components/shared/user-card'
import { useGetRecentPosts } from '@/lib/tanstack-query/post-query'
import { useGetUsers } from '@/lib/tanstack-query/user-query'
import { isValueDefined } from '@/lib/utils'

const PostList = () => {
  const { data: posts, isPending: isPendingPosts } = useGetRecentPosts()
  if (isPendingPosts) {
    return <Loading></Loading>
  } else if (isValueDefined(posts) && posts.documents.length > 0) {
    return <GridPostList posts={posts.documents} />
  } else {
    return (
      <p className="text-light-4 mt-10 w-full text-center">No posts found.</p>
    )
  }
}

const UserList = () => {
  const { data: users, isPending: isPendingUsers } = useGetUsers(4)
  if (isPendingUsers) {
    return <UserCardSkeleton></UserCardSkeleton>
  } else if (isValueDefined(users) && users.documents.length > 0) {
    return (
      <div className="flex h-full snap-x snap-proximity gap-4 overflow-x-scroll md:h-auto lg:flex-col lg:overflow-x-auto">
        {users?.documents.map(user => (
          <div className="min-w-[200px] snap-center lg:w-auto" key={user.$id}>
            <UserCard user={user}></UserCard>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <p className="text-light-4 mt-10 w-full text-center">No users found.</p>
    )
  }
}

const Home = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <PostList></PostList>
      <UserList></UserList>
    </div>
  )
}

export default Home
