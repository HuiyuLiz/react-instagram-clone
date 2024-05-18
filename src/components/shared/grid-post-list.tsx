import { type Models } from 'appwrite'

import PostCard from './post-card'

interface GridPostListProps {
  posts: Models.Document[]
}

const GridPostList = ({ posts }: GridPostListProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {posts?.map((post: Models.Document) => (
        <div key={post.$id}>
          <PostCard post={post}></PostCard>
        </div>
      ))}
    </div>
  )
}

export default GridPostList
