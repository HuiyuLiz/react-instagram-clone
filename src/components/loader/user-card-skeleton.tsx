import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const UserCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-4">
        <div className="flex h-11 items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <h4 className="font-medium">
              <Skeleton className="h-4 w-[150px]" />
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
        <Button size="sm" variant="outline" disabled>
          View
        </Button>
      </CardHeader>
    </Card>
  )
}

export default UserCardSkeleton
