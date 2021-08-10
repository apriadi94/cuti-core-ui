export const fields = [
  { key: 'nama', label : 'Nama', _style: { width: '15%'} },
  { key: 'jenis_cuti', label : 'Jenis Cuti', _style: { width: '15%'} },
  { key: 'tanggal_pengajuan', label : 'Tgl Pengajuan', _style: { width: '13%'} },
  { key: 'lama_cuti', label : 'Lama Cuti', _style: { width: '20%'} },
  { key: 'status', label : 'Status', _style: { width: '10%'} },
  { key: 'dokument', label : 'Dokument', _style: { width: '10%'} },
  {
    key: 'show_details',
    label: 'Detil',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

export const fields2 = [
  { key: 'nama', label : 'Nama', _style: { width: '15%'} },
  { key: 'jenis_cuti', label : 'Jenis Cuti', _style: { width: '15%'} },
  { key: 'tanggal_pengajuan', label : 'Tgl Pengajuan', _style: { width: '13%'} },
  { key: 'lama_cuti', label : 'Lama Cuti', _style: { width: '20%'} },
  { key: 'status', label : 'Status', _style: { width: '10%'} },
  { key: 'dokument', label : 'Dokument', _style: { width: '10%'} },
]

export const fieldsUser = [
  { key: 'jenis_cuti', label : 'Jenis Cuti', _style: { width: '15%'} },
  { key: 'alasan_cuti', label : 'Alasan Cuti', _style: { width: '25%'} },
  { key: 'tanggal_pengajuan', label : 'Tgl Pengajuan', _style: { width: '13%'} },
  { key: 'lama_cuti', label : 'Lama Cuti', _style: { width: '20%'} },
  { key: 'status', label : 'Status', _style: { width: '10%'} },
  { key: 'dokument', label : 'Dokument', _style: { width: '10%'} },
]

export const JenisCuti = (jenis) => {
  switch (jenis) {
    case 1: return 'Cuti Tahunan'
    case 2: return 'Cuti Besar'
    case 3: return 'Cuti Sakit'
    case 4: return 'Cuti Melahirkan'
    case 5: return 'Cuti Karena Alasan Penting'
    case 6: return 'Cuti di Luar Tanggungan Negara'
    default: return 'Lainnya'
  }
}

export const StatusCuti = (status) => {
  switch (status) {
    case 1: return ['Proses', 'info']
    case 2: return ['Disetujui', 'success']
    case 3: return ['Perubahan', 'warning']
    case 4: return ['Ditangguhkan', 'danger']
    case 5: return ['Tidak Disetujui', 'danger']
    default: return ['Lainnya', 'primary']
  }
}
