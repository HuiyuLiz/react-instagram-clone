import { type Models } from 'appwrite'

import { useAuthContext } from '@/context/auth-context'

import PostDetails from './post-details'
import PostStatus from './post-status'

interface PostCardProps {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthContext()
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="group relative block aspect-square overflow-hidden rounded-lg">
        <img
          alt="post"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
          height={400}
          src={post?.imageUrl ?? '/placeholder.svg'}
          style={{
            aspectRatio: '400/400',
            objectFit: 'cover'
          }}
          width={400}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <div className="p-4">
        <PostStatus post={post} userId={user.id}></PostStatus>
        <PostDetails post={post}></PostDetails>
      </div>
    </div>
  )
}

export default PostCard
