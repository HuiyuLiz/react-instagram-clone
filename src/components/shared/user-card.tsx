import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'

const UserCard = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">shadcn</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Founder of Acme Inc.
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline">
          Follow
        </Button>
      </CardHeader>
    </Card>
  )
}

export default UserCard
