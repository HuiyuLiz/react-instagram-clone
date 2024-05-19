import { type Models } from 'appwrite'

import Loading from '@/components/loader/loading'
import GridPostList from '@/components/shared/grid-post-list'
import { Heading } from '@/components/shared/heading'
import { useGetCurrentUser } from '@/lib/tanstack-query/auth-query'
import { isValueDefined } from '@/lib/utils'

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
        name: currentUser.name
      }
    }))
    .reverse()

  return (
    <div className="space-y-8">
      <Heading title="Saved Posts"></Heading>

      {!isValueDefined(currentUser) ? (
        <Loading />
      ) : (
        <ul className="flex w-full max-w-5xl justify-center gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts.</p>
          ) : (
            <GridPostList posts={savePosts} />
          )}
        </ul>
      )}
    </div>
  )
}

export default Saved
