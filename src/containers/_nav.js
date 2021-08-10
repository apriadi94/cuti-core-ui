import React from 'react'
import CIcon from '@coreui/icons-react'
import Icon from 'awesome-react-icons';


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Beranda Depan',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Pengajuan']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pengajuan Cuti',
    to: '/master/pengajuan-cuti',
    icon: <Icon name="user" className='mr-3'/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Master Data']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Master Data Cuti',
    to: '/master/data-cuti',
    icon: <Icon name="book" className='mr-3'/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Jurnal Kenaikan Pangkat',
  //   to: '/master/jurnal/pangkat',
  //   icon: <Icon name="book" className='mr-3'/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Jurnal Gaji Berkala',
  //   to: '/master/jurnal/kgb',
  //   icon: <Icon name="book" className='mr-3'/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Reminder',
  //   to: '/master/reminder',
  //   icon: <Icon name="bell" className='mr-3'/>,
  // },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Konfigurasi']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Konfigurasi Pegawai',
    to: '/konfigurasi/user',
    icon: <Icon name="users" className='mr-3'/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Konfigurasi Aplikasi',
    to: '/konfigurasi/aplikasi',
    icon: <Icon name="settings" className='mr-3'/>,
  }
]

export default _nav
