import { useState } from 'react'

import { MenuIcon } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import NavLinks from './nav-links'

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="!px-0">
        <div className="space-y-4 py-4">
          <NavLinks setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
