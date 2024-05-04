import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/lib/tanstack-query'

import './index.css'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </QueryProvider>
  </React.StrictMode>
)
