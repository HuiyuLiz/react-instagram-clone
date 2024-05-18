/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Models } from 'appwrite'
import { type Tag, TagInput } from 'emblor'

import FileUploader from '@/components/component/file-uploader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useAuthContext } from '@/context/auth-context'
import { useCreatePost, useUpdatePost } from '@/lib/tanstack-query/post-query'
import { isValueDefined } from '@/lib/utils'
import { type PostFormValue, postFormSchema } from '@/lib/validation'

interface PostFormProps {
  post?: Models.Document
  action: 'update' | 'create'
}

export default function PostForm({ post, action }: PostFormProps) {
  const navigate = useNavigate()

  const { mutateAsync: createPost, isPending: isCreatePost } = useCreatePost()

  const { mutateAsync: updatePost, isPending: isUpdatePost } = useUpdatePost()

  const { user } = useAuthContext()

  const { toast } = useToast()

  const initTags: Tag[] =
    post !== undefined
      ? post.tags.map((tag: string) => ({ id: tag, text: tag }))
      : []

  const [tags, setTags] = useState<Tag[]>(initTags)

  const defaultValues = {
    caption: post !== undefined ? post?.caption : '',
    file: [],
    location: post !== undefined ? post.location : '',
    tags: initTags
  }

  const form = useForm<PostFormValue>({
    resolver: zodResolver(postFormSchema),
    defaultValues
  })

  const { setValue } = form

  const onSubmit = async (data: PostFormValue) => {
    try {
      // ACTION = UPDATE
      if (isValueDefined(post) && action === 'update') {
        const updatedPost = await updatePost({
          ...data,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl
        })

        if (!isValueDefined(updatedPost)) {
          toast({
            title: `${action} post failed. Please try again.`
          })
        } else {
          toast({ title: 'Post updated successfully.' })
          navigate(`/posts/${post.$id}`)
          return
        }
      }

      // ACTION = CREATE
      const newPost = await createPost({
        ...data,
        userId: user.id
      })

      if (!isValueDefined(newPost)) {
        toast({ title: 'Please try again.' })
      } else {
        toast({ title: 'Post created successfully.' })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                  <Input placeholder="Enter caption..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Photo</FormLabel>
                <FormControl>
                  <FileUploader
                    fileChangeHandler={field.onChange}
                    imageUrl={post?.imageUrl}
                  ></FileUploader>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Tags</FormLabel>
                <FormControl>
                  <div id="tags">
                    <TagInput
                      {...field}
                      placeholder="Enter a tag..."
                      tags={tags}
                      setTags={newTags => {
                        setTags(newTags)
                        setValue('tags', newTags as [Tag, ...Tag[]])
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-x-2">
            <Button type="submit" disabled={isCreatePost || isUpdatePost}>
              Submit
            </Button>

            <Button
              variant={'outline'}
              type="submit"
              onClick={() => {
                navigate('/')
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
