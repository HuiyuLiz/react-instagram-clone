import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const PostCardSkeleton = () => {
  return (
    <Card className="grid grid-cols-1 gap-4 border-0 lg:grid-cols-[480px_1fr] lg:border">
      <Skeleton className="h-[400px] w-full" />

      <div className="flex flex-col items-stretch justify-between space-y-8 p-4 lg:my-4">
        <div className="flex h-11 items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <h4 className="font-medium">
              <Skeleton className="h-4 w-[200px]" />
            </h4>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PostCardSkeleton
