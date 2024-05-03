/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

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
import { createUserAccount } from '@/lib/appwrite/auth-service'
import {
  type SignUpFormValue,
  signupformSchema
} from '@/lib/appwrite/auth-service.type'

export default function SignupForm() {
  const { toast } = useToast()
  const [loading] = useState(false)
  const defaultValues = {
    email: ''
  }
  const form = useForm<SignUpFormValue>({
    resolver: zodResolver(signupformSchema),
    defaultValues
  })

  const onSubmit = async (data: SignUpFormValue) => {
    const newUser = await createUserAccount(data)

    if (newUser === undefined || newUser === null) {
      toast({ title: 'Sign up failed. Please try again.' })
    }
  }

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create a new account
          </h1>
          <p className="text-sm text-muted-foreground">
            Please enter your details below to create your account
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Enter your name..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Enter your User Name..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>

          <p className="px-8 py-2 text-center text-sm text-muted-foreground">
            Already have an accout?{' '}
            <Link
              to="/sign-in"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </>
  )
}
