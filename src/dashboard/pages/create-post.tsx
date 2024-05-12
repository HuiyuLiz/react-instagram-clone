import PostForm from '@/components/forms/post-form'

const CreatePost = () => {
  return (
    <div className="flex max-w-xl flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create a new post
        </h1>
      </div>
      <PostForm></PostForm>
    </div>
  )
}

export default CreatePost
