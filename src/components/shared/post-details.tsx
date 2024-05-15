import { Link } from 'react-router-dom'

import { type Models } from 'appwrite'

import { useAuthContext } from '@/context/auth-context'
import { multiFormatDateString } from '@/lib/utils'

import PencilIcon from '../icon/pencilicon'

interface PostDetailsProps {
  post: Models.Document
}

const PostDetails = ({ post }: PostDetailsProps) => {
  const { user } = useAuthContext()
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Link to={`/profile/${post.creator.$id}`}>
              <p className="base-medium lg:body-bold font-bold">
                {post.creator.name}
              </p>
            </Link>

            <div className="flex-center flex gap-2 ">
              <p className="text-sm  text-gray-600 ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •<p className="text-sm  text-gray-600">{post.location}</p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={
            user.id !== post.creator.$id
              ? 'hidden'
              : 'block cursor-pointer p-2 pr-0'
          }
        >
          <PencilIcon className="h-5 w-5"></PencilIcon>
        </Link>
      </div>
      <div className="text-sm">
        <p className="font-bold">{post.caption}</p>
        <ul className="flex gap-1">
          {post.tags.map((tag: string, index: string) => (
            <li key={`${tag}${index}`} className="text-sm  text-gray-600">
              #{tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostDetails
