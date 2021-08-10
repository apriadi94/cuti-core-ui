import React, { useState, useContext, useEffect } from 'react';
import {CButton, CCol, CFormGroup, CInput, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect} from "@coreui/react";
import './user.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as FormikHelper from './FormikHelper';
import { API } from '../../../helper';
import swal from 'sweetalert';
import {GlobalContext} from "../../../globalState";

const TextForm = (props) => {
  return(
    <CCol md="6">
      <CFormGroup>
        <CLabel>{props.label}</CLabel>
        <Field type={props.type} className={props.type === 'password' ? 'type_password' : null} as={CInput} id={props.label} name={props.name} placeholder={`Isikan ${props.name}`}/>
        <ErrorMessage name={props.name} render={msg => <span style={{color : 'red', fontSize : 10, marginLeft : 5}}>{msg}</span>} />
      </CFormGroup>
    </CCol>
  )
}

const ModalTambahUserKomponent = ({Modal, ToggleModal, GetData, initialValues, setinitialValues}) => {
  const [Loading, setLoading] = useState(false);
  const {ListUser, GetListUser, AsyncToken} = useContext(GlobalContext)

  const TambahDataPegawai = async (values, { setFieldError }) => {
    setLoading(true);
    if(initialValues !== null){
      await API('put', 'api/user', values, AsyncToken).then(async res => {
        swal("Berhasil, data berhasil diubah", {
          icon: "success",
        });
        ToggleModal();
        await GetData();
      }).catch(err => {
        if(err.response.status){
          setFieldError(err.response.data.data.message[0].path, err.response.data.data.message[0].message)
        }
      })
    }else{
      await API('post', 'api/user', values, AsyncToken).then(async res => {
        ToggleModal();
        GetListUser();
        await GetData();
      }).catch(err => {
        if(err.response.status){
          setFieldError(err.response.data.data.message[0].path, err.response.data.data.message[0].message)
        }
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    return(() => {
      if(initialValues !== null){
        setinitialValues(null)
      }
    })
  }, [])

  return(
    <CModal
      show={Modal}
      onClose={ToggleModal}
      closeOnBackdrop={false}
      size={'lg'}
    >
      <Formik
        initialValues={initialValues === null ? FormikHelper.InitialValues : initialValues}
        validationSchema={FormikHelper.SignupSchema}
        onSubmit={TambahDataPegawai}
      >
        <Form>
          <CModalHeader>
            <CModalTitle>{initialValues === null ? "Tambah Data Pegawai" : "Edit Data Pegawai"}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
                  <TextForm name={'nama'} label={'Nama Pegawai'} type={'text'}/>
                  <TextForm name={'nip'} label={'NIP Pegawai'} type={'text'}/>
                  <TextForm name={'email'} label={'Email Pegawai'} type={'text'}/>
                  <TextForm name={'username'} label={'Username Pegawai'} type={'text'}/>

              {
                initialValues === null ?
                <React.Fragment>
                  <TextForm name={'password'} label={'Password'} type={'password'}/>
                  <TextForm name={'c_password'} label={'Konfirmasi Password'} type={'password'}/>
                </React.Fragment> : null
              }

                  <TextForm name={'agama'} label={'Agama'} type={'text'}/>
                  <TextForm name={'jenis_kelamin'} label={'Jenis Kelamin'} type={'text'}/>


                  <TextForm label={'Pendidikan Terakhir'} name={'tingkat_pendidikan'} type={'text'}/>
                  <TextForm label={'Tahun Lulus'} name={'tahun_lulus_pendidikan'} type={'text'}/>

                  <TextForm label={'TMT CPNS'} name={'tmt_cpns'} type={'date'}/>
                  <TextForm label={'TMT PNS'} name={'tmt_pns'} type={'date'}/>

                  <TextForm label={'Jabatan Pegawai'} name={'jabatan'} type={'text'} />
                  <TextForm label={'TMT Jabatan'} name={'tmt_jabatan'} type={'date'}/>
                  <TextForm label={'Tgl. SK Jabatan'} name={'tanggal_sk_jabatan'}  type={'date'} />
                  <TextForm label={'No. SK Jabatan'} name={'nomor_sk_jabatan'} type={'text'} />

                  <TextForm label={'Pangkat Pegawai'} name={'pangkat'} type={'text'} />
                  <TextForm label={'Eselon'} name={'eselon'} type={'text'} />

                  <TextForm label={'Golongan Pegawai'} name={'golongan'} type={'text'} />
                  <TextForm label={'TMT Golongan'} name={'tmt_golongan'} type={'date'}/>
                  <TextForm label={'Nomor Telpon'} name={'nomor_telpon'} type={'text'}/>

                  <CCol md="6">
                    <CFormGroup>
                      <CLabel>Atasan Langung</CLabel>
                      <Field name="atasan_langsung" as={CSelect}>
                        <option value={''}>Pilih Atasan Langsung</option>
                        {
                          ListUser.map((list, index) =>
                            <option key={index} value={list.id}>{list.nama} -- {list.jabatan}</option>
                          )
                        }
                      </Field>
                      <ErrorMessage name={'atasan_langsung'} render={msg => <span style={{color : 'red', fontSize : 10, marginLeft : 5}}>{msg}</span>} />
                    </CFormGroup>
                  </CCol>


            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton disabled={Loading} type='submit' color="primary">{Loading ? 'Loading...' : initialValues === null ? 'Tambah Data' : 'Ubah Data'}</CButton>{' '}
            <CButton
              color="secondary"
              onClick={ToggleModal}
            >Cancel</CButton>
          </CModalFooter>
        </Form>
      </Formik>
    </CModal>
  )
}
const ModalTambahUser = React.memo(ModalTambahUserKomponent);
export default ModalTambahUser;
