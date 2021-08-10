import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  CCard,
  CCardBody, CCardHeader, CButton, CCol, CFormGroup, CLabel, CInput, CModal,
} from '@coreui/react'

import {API} from "../../../helper";
import swal from 'sweetalert';
import {GlobalContext} from "../../../globalState";
import Icon from 'awesome-react-icons';
import {Formik, Form, Field, ErrorMessage} from 'formik';


const TextForm = (props) => {
  return(
    <CCol md="12">
      <CFormGroup>
        <CLabel>{props.label}</CLabel>
        <Field type={props.type} className={props.type} as={CInput} id={props.label} name={props.name} placeholder={`Isikan ${props.name}`}/>
        <ErrorMessage name={props.name} render={msg => <span style={{color : 'red', fontSize : 10, marginLeft : 5}}>{msg}</span>} />
      </CFormGroup>
    </CCol>
  )
}

const Konfig = () => {
  const { AsyncToken } = useContext(GlobalContext);
  const [InitialState, setInitialState] = useState({
    jatah_cuti_tahunan: null,
    nama_instansi: "",
    singkatan_instansi: "",
    nama_ketua: "",
    nip_ketua: "",
    nama_aplikasi: "",
    singkatan_aplikasi: "",
    periode_pertama : "",
    periode_kedua : "",
  })
  const [Loading, setLoading] = useState(true);
  const [LoadingTombol, setLoadingTombol] = useState(false)

  const GetData = async () => {
    await API('get','api/konfig', null, AsyncToken)
      .then(res => {
        let DataValues = res.data.data;
        setInitialState({
          jatah_cuti_tahunan: DataValues.jatah_cuti_tahunan,
          nama_instansi: DataValues.nama_instansi,
          singkatan_instansi: DataValues.singkatan_instansi,
          nama_ketua: DataValues.nama_ketua,
          nip_ketua: DataValues.nip_ketua,
          nama_aplikasi: DataValues.nama_aplikasi,
          singkatan_aplikasi: DataValues.singkatan_aplikasi,
          periode_pertama : DataValues.periode_pertama,
          periode_kedua : DataValues.periode_kedua,
        })
      }).catch(err => {
        console.log(err)
      })
    setLoading(false)
  }


  const UpdateKonfig = async (values) => {
    setLoadingTombol(true)
    await API('put','api/konfig/update', values, AsyncToken)
      .then(res => {
        swal("Berhasil, data berhasil diubah", {
          icon: "success",
        });
      }).catch(err => {
        console.log(err)
      })
    setLoadingTombol(false)
  }

  useEffect(() => { GetData() }, [])

  return(
    <>
      {
        Loading ?
          <h4 className={'text-center'}>Loading...</h4> :
          <CCard>
            <CCardHeader>
              Konfigurasi Aplikasi
              <div className='float-right'>
                <CButton size="sm" color="success" className='d-flex'>
                  <Icon name="whatsapp" className='mr-3'/> Subscribe Reminder Whatsapp
                </CButton>
              </div>
            </CCardHeader>

            <CCardBody>
              <Formik
                initialValues={InitialState}
                onSubmit={UpdateKonfig}
              >
                <Form>
                  <TextForm name={'nama_instansi'} label={'Nama Instansi'} type={'text'}/>
                  <TextForm name={'singkatan_instansi'} label={'Singkatan Instansi'} type={'text'}/>
                  <TextForm name={'nama_aplikasi'} label={'Nama Aplikasi'} type={'text'}/>
                  <TextForm name={'singkatan_aplikasi'} label={'Singkatan Aplikasi'} type={'text'}/>
                  <TextForm name={'nama_ketua'} label={'Nama Ketua'} type={'text'}/>
                  <TextForm name={'nip_ketua'} label={'NIP Ketua'} type={'text'}/>
                  <TextForm name={'jatah_cuti_tahunan'} label={'Jatah Cuti Tahunan'} type={'number'}/>
                  <TextForm name={'periode_pertama'} label={'Periode Pengangkatan Pertama'} type={'date'}/>
                  <TextForm name={'periode_kedua'} label={'Periode Pengangkatan Kedua'} type={'date'}/>
                  <TextForm name={'number_reminder'} label={'Nomor Pengirim Reminder'} type={'text'}/>
                  <TextForm name={'url_reminder'} label={'Url Reminder'} type={'text'}/>
                  <br/>

                  <CCol md={12}>
                    <CButton disabled={LoadingTombol} color="success" type="submit">Simpan Perubahan</CButton>
                  </CCol>
                </Form>
              </Formik>
            </CCardBody>
          </CCard>
      }
    </>
  )
}

export default Konfig;
