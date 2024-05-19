import { Heading } from '@/components/shared/heading'
import UserList from '@/components/shared/user-list'

const Users = () => {
  return (
    <div className="space-y-8">
      <Heading title="All users"></Heading>
      <UserList></UserList>
    </div>
  )
}

export default Users
