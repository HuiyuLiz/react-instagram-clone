import { Link, useNavigate, useParams } from 'react-router-dom'

import PostContent from '@/components/shared/post-content'
import PostStatus from '@/components/shared/post-status'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthContext } from '@/context/auth-context'
import { useDeletePost, useGetPostById } from '@/lib/tanstack-query/post-query'
import { isValueDefined, multiFormatDateString } from '@/lib/utils'

const Post = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id)
  const { mutate: deletePost } = useDeletePost()
  if (isPending) return <div>Loading...</div>
  if (!isValueDefined(post)) return <div>Post not found.</div>

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId })
    navigate(-1)
  }

  return (
    <Card className="grid grid-cols-1 gap-4 lg:grid-cols-[600px_1fr]">
      <CardContent className="p-0">
        <div className="group relative block aspect-square overflow-hidden rounded-lg">
          <img
            alt="post"
            className="h-full w-full object-cover "
            height={400}
            src={post?.imageUrl ?? '/placeholder.svg'}
            style={{
              aspectRatio: '400/400',
              objectFit: 'cover'
            }}
            width={400}
          />
        </div>
      </CardContent>

      <div className="my-4 flex flex-col items-stretch justify-between space-y-8 p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                alt="user"
                src={post?.creator?.imageUrl ?? '/placeholder-user.jpg'}
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col">
              <div className="font-bold"> {post?.creator.name}</div>
              <div className="flex w-full gap-2 text-sm">
                <p className="lg:small-regular font-bold ">
                  {multiFormatDateString(post.$createdAt)}
                </p>
                •<p className="lg:small-regular font-bold">{post.location}</p>
              </div>
            </div>
          </div>
          <PostContent post={post}></PostContent>
        </div>

        <div className="flex flex-col items-center justify-between lg:flex-row">
          <PostStatus post={post} userId={user.id}></PostStatus>

          <div
            className={
              user.id !== post?.creator?.$id
                ? 'hidden'
                : 'flex items-center justify-between space-x-4'
            }
          >
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>

            <Button asChild variant={'outline'}>
              <Link to={`/update-post/${post?.$id}`}>Edit</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Post
