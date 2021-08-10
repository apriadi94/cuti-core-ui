import * as Yup from "yup";

export const InitialValues = {
  nama: '',
  email : '',
  nip : '',
  username : '',
  password : '',
  c_password : '',
  jabatan : '',
  pangkat : '',
  golongan : '',
  otoritas : '',
  tingkat_pendidikan: '',
  tahun_lulus_pendidikan: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  agama: '',
  status_kawin: '',
  tmt_pns: '',
  tmt_cpns: '',
  tmt_golongan: '',
  tanggal_sk_golongan: '',
  eselon: '',
  tmt_jabatan: '',
  tanggal_sk_jabatan: '',
  nomor_sk_jabatan: '',
  atasan_langsung: '',
  nomor_telpon : '',
}

export const SignupSchema = Yup.object().shape({
  nama: Yup.string()
    .min(5, 'Terlalu Pendek!')
    .required('Nama Harus Diisi'),
  jabatan: Yup.string()
    .required('Jabatan Harus Diisi'),
  pangkat: Yup.string()
    .required('Pangkat Harus Diisi'),
  nip: Yup.string()
    .required('NIP Harus Diisi'),
  username: Yup.string()
    .required('Username Harus Diisi'),
  email: Yup.string()
    .email('Email Tidak Semestinya')
    .required('Email Harus diisi'),
  atasan_langsung : Yup.string()
    .required('Harus dipilih'),
  password: Yup.string().required('Password harus diisi'),
  c_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Konfirmasi Password tidak cocok')
});
