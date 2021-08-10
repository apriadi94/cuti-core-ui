
export const fields = [
  { key: 'nama', label : 'Nama', _style: { width: '25%'} },
  { key: 'nip', label : 'NIP', _style: { width: '18%'} },
  { key: 'jabatan', label : 'Jabatan', _style: { width: '15%'} },
  { key: 'pangkat', label : 'Pangkat/Golongan', _style: { width: '20%'}},
  { key: 'eselon', label : 'Eselon', _style: { width: '15%'}},
  {
    key: 'show_details',
    label: 'Detil',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

export const getBadge = (status)=>{
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
