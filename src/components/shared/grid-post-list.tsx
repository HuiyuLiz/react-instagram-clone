import { type Models } from 'appwrite'

import PostCard from './post-card'

interface GridPostListProps {
  posts: Models.Document[]
  showDetails?: boolean
}

const GridPostList = ({ posts, showDetails }: GridPostListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {posts?.map((post: Models.Document) => (
        <div key={post.$id}>
          <PostCard post={post} showDetails={showDetails}></PostCard>
        </div>
      ))}
    </div>
  )
}

export default GridPostList
