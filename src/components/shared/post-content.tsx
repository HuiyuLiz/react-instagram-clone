import { type Models } from 'appwrite'

interface PostContentProps {
  post: Models.Document
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold">{post?.caption}</div>

      <div className="flex flex-wrap gap-2">
        {post?.tags.map((tag: string, index: string) => (
          <span
            key={`${tag}${index}`}
            className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PostContent
