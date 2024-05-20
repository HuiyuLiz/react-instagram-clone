import { Outlet, useLocation } from 'react-router-dom'

import Modal from '@/components/shared/modal'
import { isValueDefined } from '@/lib/utils'

const ModalLayout = () => {
  const { state } = useLocation()

  return isValueDefined(state?.backgroundLocation) ? (
    <Modal open={isValueDefined(state?.backgroundLocation)}>
      <Outlet />
    </Modal>
  ) : (
    <div className="container pb-16 lg:max-w-4xl">
      <Outlet />
    </div>
  )
}

export default ModalLayout
