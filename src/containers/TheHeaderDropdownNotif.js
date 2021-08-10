import React, {useContext} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'
import {Link} from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import {GlobalContext} from "../globalState";

const TheHeaderDropdownNotif = () => {
  const {NotifPengajuan} = useContext(GlobalContext)
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <Link to={'/master/pengajuan-cuti'}>
          <CIcon name="cil-bell"/>
          <CBadge shape="pill" color="danger">{NotifPengajuan}</CBadge>
          </Link>
        </CDropdownToggle>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif
