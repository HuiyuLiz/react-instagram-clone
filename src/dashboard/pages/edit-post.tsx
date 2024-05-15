import { useParams } from 'react-router-dom'

import PostForm from '@/components/forms/post-form'
import { useGetPostById } from '@/lib/tanstack-query/post-query'

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id)

  if (isPending) return <p>Loading...</p>

  return (
    <div className="flex max-w-xl flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>
      </div>
      <PostForm post={post} action="update"></PostForm>
    </div>
  )
}

export default EditPost
