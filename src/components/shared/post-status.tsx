import { useEffect, useState } from 'react'

import { type Models } from 'appwrite'

import { useGetCurrentUser } from '@/lib/tanstack-query/auth-query'
import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost
} from '@/lib/tanstack-query/post-query'
import { isValueDefined } from '@/lib/utils'

import BookMarkIcon from '../icon/bookmarkicon'
import HeartIcon from '../icon/hearticon'
import SolidBookMarkIcon from '../icon/solidbookmarkicon'
import SolidHeartIcon from '../icon/solidhearticon'
import Loader from './loader'

interface PostStatusProps {
  post: Models.Document
  userId: string
}

const PostStatus = ({ post, userId }: PostStatusProps) => {
  const likesList: string[] = post.likes.map(
    (user: Models.Document) => user.$id
  )

  const [likes, setLikes] = useState<string[]>(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavePost, isPending: isDeletingPost } =
    useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord: Models.Document | undefined = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  )

  const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList.includes(userId)
  }

  useEffect(() => {
    setIsSaved(!!isValueDefined(savedPostRecord))
  }, [currentUser, savedPostRecord])

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()

    let likesArray = [...likes]

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter(Id => Id !== userId)
    } else {
      likesArray.push(userId)
    }

    setLikes(likesArray)
    likePost({ postId: post.$id, likesArray })
  }

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()

    if (isValueDefined(savedPostRecord)) {
      setIsSaved(false)
      deleteSavePost(savedPostRecord.$id)
      return
    }

    savePost({ userId, postId: post.$id })
    setIsSaved(true)
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div
        className="flex cursor-pointer items-center space-x-2 p-2 pl-0"
        onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
          handleLikePost(e)
        }}
      >
        {checkIsLiked(likes, userId) ? (
          <SolidHeartIcon className="h-5 w-5"></SolidHeartIcon>
        ) : (
          <HeartIcon className="h-5 w-5"></HeartIcon>
        )}
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="cursor-pointer p-2 pr-0">
        {isSavingPost || isDeletingPost ? (
          <Loader></Loader>
        ) : (
          <div
            onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
              handleSavePost(e)
            }}
          >
            {isSaved ? (
              <SolidBookMarkIcon className="h-5 w-5"></SolidBookMarkIcon>
            ) : (
              <BookMarkIcon className="h-5 w-5"></BookMarkIcon>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostStatus
