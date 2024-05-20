import { type Models } from 'appwrite'

import ErrorMessage from '@/components/loader/error-message'
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
        imageUrl: currentUser.imageUrl
      }
    }))
    .reverse()

  return (
    <div className="space-y-8">
      <Heading title="Saved Posts"></Heading>

      {!isValueDefined(currentUser) ? (
        <Loading />
      ) : (
        <ul className="flex w-full max-w-5xl justify-start gap-9">
          {savePosts.length === 0 ? (
            <ErrorMessage message="No available posts."></ErrorMessage>
          ) : (
            <GridPostList posts={savePosts} showDetails={false} />
          )}
        </ul>
      )}
    </div>
  )
}

export default Saved
