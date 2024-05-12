import * as z from 'zod'

export const signupformSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
})

export type SignUpFormValue = z.infer<typeof signupformSchema>

export const signinformSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
})

export type SignInFormValue = z.infer<typeof signinformSchema>

export const postFormSchema = z.object({
  caption: z
    .string()
    .min(1, { message: 'Minimum 1 characters.' })
    .max(2200, { message: 'Maximum 2,200 caracters' }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(1000, { message: 'Maximum 1000 characters.' }),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  )
})

export type PostFormValue = z.infer<typeof postFormSchema>
