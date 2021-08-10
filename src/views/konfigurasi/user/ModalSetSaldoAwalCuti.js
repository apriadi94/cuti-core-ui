import React, {useState, useContext, useEffect} from 'react';
import {
  CButton,
  CRow,
  CCol,
  CFormGroup, CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import moment from 'moment';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";

const TextForm = (props) => {
  return(
    <CCol md={12}>
      <CFormGroup>
        <CLabel>{props.label}</CLabel>
        <Field type={props.type} className={props.type === 'password' ? 'type_password' : null} as={CInput} id={props.label} name={props.name} placeholder={`Isikan ${props.name}`}/>
        <ErrorMessage name={props.name} render={msg => <span style={{color : 'red', fontSize : 10, marginLeft : 5}}>{msg}</span>} />
      </CFormGroup>
    </CCol>
  )
}

const ModalSetSaldoAwalCutiKomponent = ({Modal, ToggleModal, GetData, initialValues, setinitialValues}) => {
  const [Loading, setLoading] = useState(false)
  const {AsyncToken} = useContext(GlobalContext)

  const TahunIni = moment().format('YYYY');
  const TahunLalu = TahunIni - 1;
  const DuaTahunLalu = TahunIni - 2;

  const UbahSaldoCuti = (values) => {
    API('put', 'api/user/saldo-cuti', values, AsyncToken)
      .then(res => {
        GetData()
        setinitialValues(null)
        ToggleModal()
      }).catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    return(() => {
      if(initialValues !== null){
        console.log('tutup')
        setinitialValues(null)
      }
    })
  },)



  return(
    <CModal
      show={Modal}
      onClose={ToggleModal}
      closeOnBackdrop={false}
      size={'lg'}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={UbahSaldoCuti}
      >
        <Form>
          <CModalHeader>
            <CModalTitle>{"Saldo Awal Cuti Pegawai"}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <TextForm name={[TahunIni]} label={'Sisa Cuti Tahun Ini (N)'} type={'text'}/>
              <TextForm name={[TahunLalu]} label={'Sisa Cuti Tahun Lalu (N-1)'} type={'text'}/>
              <TextForm name={[DuaTahunLalu]} label={'Sisa Cuti Dua Tahun Lalu (N-2)'} type={'text'}/>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton disabled={Loading} type='submit' color="primary">{Loading ? 'Loading...' : 'Set Data'}</CButton>{' '}
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
const ModalSetSaldoAwalCuti = React.memo(ModalSetSaldoAwalCutiKomponent);
export default ModalSetSaldoAwalCuti;
