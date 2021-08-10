import React from 'react'
import CIcon from '@coreui/icons-react'
import Icon from 'awesome-react-icons';


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Master Data']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pengajuan Cuti',
    to: '/master/pengajuan-cuti',
    icon: <Icon name="user" className='mr-3'/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Master Data Cuti',
    to: '/master/data-cuti',
    icon: <Icon name="book" className='mr-3'/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Konfigurasi']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profile Saya',
    to: '/konfigurasi/user',
    icon: <Icon name="user" className='mr-3'/>,
  },

]

export default _nav
