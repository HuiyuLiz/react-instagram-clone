import { Outlet, useLocation } from 'react-router-dom'

import Modal from '@/components/shared/modal'
import { isValueDefined } from '@/lib/utils'

const ModalLayout = () => {
  const location = useLocation()
  const background = location.state?.backgroundLocation

  return isValueDefined(background) ? (
    <Modal open={isValueDefined(background)}>
      <Outlet />
    </Modal>
  ) : (
    <div className="container pb-16 lg:max-w-4xl">
      <Outlet />
    </div>
  )
}

export default ModalLayout
