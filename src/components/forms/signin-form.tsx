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
import { type SignInFormValue, signinformSchema } from '@/lib/validation'

export default function SigninForm() {
  const [loading, setLoading] = useState(false)
  const defaultValues = {
    email: ''
  }
  const form = useForm<SignInFormValue>({
    resolver: zodResolver(signinformSchema),
    defaultValues
  })

  const onSubmit = async (data: SignInFormValue) => {
    setLoading(true)
    console.log(data)
    setLoading(false)
  }

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Please enter your details
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
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
            {loading ? 'Loading...' : 'Sign In'}
          </Button>

          <p className="px-8 py-2 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              to="/sign-up"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </>
  )
}
