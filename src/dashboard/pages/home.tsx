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
  const { data: users, isPending: isPendingUsers } = useGetUsers(3)
  if (isPendingUsers) {
    return <UserCardSkeleton></UserCardSkeleton>
  } else if (isValueDefined(users) && users.documents.length > 0) {
    return (
      <div className="space-y-4">
        {users?.documents.map(user => (
          <UserCard key={user.$id} user={user}></UserCard>
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
    <div className="grid grid-cols-[1fr_300px] gap-8">
      <PostList></PostList>
      <UserList></UserList>
    </div>
  )
}

export default Home
