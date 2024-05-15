export interface User {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  bio: string
}

export interface NewUser {
  name: string
  email: string
  username: string
  password: string
}

export interface SaveUserParams {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface NewPost {
  userId: string
  caption: string
  file: File[]
  location?: string
  tags?: Tag[]
}

export interface UpdatePost {
  postId: string
  caption: string
  imageId: string
  imageUrl: URL
  file: File[]
  location?: string
  tags?: Tag[]
}

export interface Tag {
  id: string
  text: string
}
