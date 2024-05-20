import { type Models } from 'appwrite'

import { useGetUsers } from '@/lib/tanstack-query/user-query'
import { isValueDefined } from '@/lib/utils'

import ErrorMessage from '../loader/error-message'
import UserCardSkeleton from '../loader/user-card-skeleton'
import UserCard from './user-card'

const UserList = () => {
  const { data: users, isPending: isPendingUsers } = useGetUsers()

  let list
  if (isPendingUsers) {
    list = <UserCardSkeleton></UserCardSkeleton>
  } else if (isValueDefined(users) && users.documents.length > 0) {
    list = (
      <>
        {users?.documents.map((user: Models.Document) => (
          <UserCard key={user.$id} user={user}></UserCard>
        ))}
      </>
    )
  } else {
    list = <ErrorMessage message="No users found."></ErrorMessage>
  }

  return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{list}</div>
}

export default UserList
