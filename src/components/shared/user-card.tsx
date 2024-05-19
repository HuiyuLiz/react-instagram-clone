import { Link } from 'react-router-dom'

import { type Models } from 'appwrite'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'

interface UserCardProps {
  user: Models.Document
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              alt="@shadcn"
              src={user?.imageUrl ?? '/placeholder-avatar.jpg'}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium"> {user?.name}</h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{user?.username}
            </div>
          </div>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link to={`/profile/${user.$id}`}>View</Link>
        </Button>
      </CardHeader>
    </Card>
  )
}

export default UserCard
