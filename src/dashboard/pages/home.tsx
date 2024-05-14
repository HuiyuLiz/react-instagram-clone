import { type Models } from 'appwrite'

import PostCard from '@/components/shared/post-card'
import UserCard from '@/components/shared/user-card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetRecentPosts } from '@/lib/tanstack-query/post-query'
import { isValueDefined } from '@/lib/utils'

export function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Home = () => {
  const { data: posts, isPending: isPendingPosts } = useGetRecentPosts()
  console.log('posts', posts)
  return (
    <div className="grid grid-cols-[1fr_300px] gap-8">
      {isPendingPosts && !isValueDefined(posts) ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {posts?.documents?.map((post: Models.Document) => (
              <div key={post.$id}>
                <PostCard post={post}></PostCard>
                {/* <PostDetails post={post}></PostDetails> */}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <UserCard></UserCard>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
