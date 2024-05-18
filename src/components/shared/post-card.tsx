import { Link } from 'react-router-dom'

import { type Models } from 'appwrite'

import { multiFormatDateString } from '@/lib/utils'

interface PostCardProps {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Link to={`/posts/${post.$id}`}>
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
          <div className="absolute bottom-5 left-5 z-50 flex w-full flex-col text-white">
            <div className="font-bold"> {post?.creator.name}</div>
            <div className="flex w-full gap-2 text-sm text-gray-300 ">
              <p className="font-bold lg:text-sm ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •<p className="font-bold lg:text-sm">{post.location}</p>
            </div>
          </div>
          <div className="black to-balck/0 from-3% absolute inset-0 flex items-center justify-center  bg-gradient-to-t from-black/50 via-black/5 to-transparent"></div>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
