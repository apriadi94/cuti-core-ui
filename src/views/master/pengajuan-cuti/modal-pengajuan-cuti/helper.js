import { useContext } from 'react';
import {GlobalContext} from "../../../../globalState";
import * as Yup from "yup";

const Helper = () => {
  const {User, Konfig} = useContext(GlobalContext)
  const InitialValues = {
    user_id : User.id,
    atasan_langsung : User.atasan_langsung,
    nama_ketua : Konfig.nama_ketua,
    nip_ketua : Konfig.nip_ketua,
    tanggal_pengajuan : '',
    tanggal_awal_cuti : '',
    tanggal_akhir_cuti : '',
    jenis_cuti : '',
    alasan_cuti : '',
  }

  const SignupSchema = Yup.object().shape({
    jenis_cuti: Yup.string()
      .required('Jenis Cuti Harus Dipilih'),
    atasan_langsung: Yup.string()
      .required('Atasan Langsung Harus Dipilih'),
    alasan_cuti: Yup.string()
      .required('Alasan Cuti Tidak Boleh Kosong'),
    tanggal_pengajuan: Yup.string()
      .required('Tanggal Pengajuan Tidak Boleh kosong'),
    tanggal_awal_cuti: Yup.string()
      .required('Tanggal Awal Cuti Tidak Boleh kosong'),
    tanggal_akhir_cuti: Yup.string()
      .required('Tanggal Akhir Cuti Tidak Boleh kosong'),
  });


  return { InitialValues, SignupSchema }
}

export default Helper;
