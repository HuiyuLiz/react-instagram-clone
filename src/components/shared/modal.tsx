import { useNavigate } from 'react-router-dom'

import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ModalProps {
  open: boolean
  children: React.ReactNode
}

export default function Modal({ open, children }: ModalProps) {
  const navigate = useNavigate()

  const onDismiss = () => {
    navigate(-1)
  }

  return (
    <Dialog open={open} onOpenChange={onDismiss}>
      <DialogContent className="h-full w-full p-0 lg:h-auto lg:max-w-4xl">
        <div className="">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
