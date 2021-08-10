import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdownMssg = () => {
  const itemsCount = 4
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownMssg
