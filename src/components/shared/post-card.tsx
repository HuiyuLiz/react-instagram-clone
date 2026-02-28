import { Link, useLocation } from 'react-router-dom'

import { type Models } from 'appwrite'

import { multiFormatDateString } from '@/lib/utils'

interface PostCardProps {
  post: Models.Document
  showDetails?: boolean
}

const PostCard = ({ post, showDetails = true }: PostCardProps) => {
  const location = useLocation()

  return (
    <div className="overflow-hidden rounded-lg border">
      <Link to={`/posts/${post.$id}`} state={{ backgroundLocation: location }}>
        <div className="group relative block aspect-square overflow-hidden rounded-lg">
          <img
            alt="post"
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
            height={400}
            src={
              post?.imageUrl
                ?.toString()
                .replace(
                  /\/preview\?[^"]*/,
                  `/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`
                ) ?? '/placeholder.svg'
            }
            style={{
              aspectRatio: '400/400',
              objectFit: 'cover'
            }}
            width={400}
          />
          {showDetails && (
            <div className="absolute bottom-5 z-50 flex w-full flex-col px-4 text-white">
              <div className="font-bold"> {post?.creator?.name}</div>
              <div className="flex w-full flex-wrap gap-2 text-sm text-gray-300">
                <div className="font-bold lg:text-sm ">
                  {multiFormatDateString(post.$createdAt)}
                </div>
                •<div className="font-bold lg:text-sm">{post?.location}</div>
              </div>
            </div>
          )}

          <div className="black to-balck/0 from-3% absolute inset-0 flex items-center justify-center  bg-gradient-to-t from-black/50 via-black/5 to-transparent"></div>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
