import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  CCard,
  CCardBody, CCardHeader, CDataTable, CCollapse, CButton, CBadge
} from '@coreui/react'
import {fields, getBadge} from './helper'
import ModalTambahUser from "./ModalTambahUser";
import ModalSetSaldoAwalCuti from "./ModalSetSaldoAwalCuti";
import {API} from "../../../helper";
import swal from 'sweetalert';
import CustomHooks from "./c_detail";
import CustomModal from "./c_modal";
import {GlobalContext} from "../../../globalState";
import moment from 'moment';

const UserAdminKomponent = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [UserData, setUserData] = useState([])
  const [details, toggleDetails] = CustomHooks();
  const [Loading, setLoading] = useState(true)


  const [initialValues, setinitialValues] = useState(null)
  const [initialValues2, setinitialValues2] = useState(null)

  const [Modal,ToggleModal] = CustomModal();
  const [ModalEdit, ToggleModalEdit] = CustomModal();
  const [StateModalSaldoCUti, ToggleModalSetStateModalSaldoCUti] = CustomModal();


  const GetData = useCallback(async () => {
    await API('get','api/user', null, AsyncToken)
      .then(res => {
        setUserData(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    setLoading(false)
  },[])

  const ValidasiDelete = (IdUser, action) => {
    swal({
      title: "Anda Yakin?",
      text: action === 'block' ? 'User tidak akan dapat mengakses aplikasi' : 'User dapat kembali mengakses aplikasi',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          DeleteUser(IdUser, action)
        } else {
          swal("Aksi dibatalkan");
        }
      });
  }

  const DeleteUser = async (IdUser, action) => {
    setLoading(true)
    await API('put','api/user/block', {id : IdUser, action : action}, AsyncToken)
      .then(async res => {
        await GetData();
        swal("Berhasil, data berhasil diblokir", {
          icon: "success",
        });
      }).catch(err => {
        console.log(err)
      });
    setLoading(false)
  }

  useEffect(() => {
    GetData()
  }, [GetData])

  return(
    <>
      <CCard>
        <CCardHeader>
          Data Kepegawaian
          <div className='float-right'>
            <CButton onClick={ToggleModal} size="sm" color="primary">+ Tambah Pegawai</CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <CDataTable
            items={UserData}
            fields={fields}
            columnFilter
            noItemsView={Loading ?  {noItems: '... Mengambil Data'} :  {noResults: 'Pencarian Tidak Ditemukan', noItems: 'Tidak Ada Data'}}
            loading={Loading}
            itemsPerPage={10}
            hover
            striped={true}
            footer={true}
            sorter
            pagination
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
              'show_details':
                (item, index)=>{
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={()=>{toggleDetails(item.id)}}
                      >
                        {details.includes(item.id) ? 'Sembunyi' : 'Tampilkan'}
                      </CButton>
                    </td>
                  )
                },
              'details':
                (item, index)=>{
                  return (
                    <CCollapse show={details.includes(item.id)}>
                      <CCardBody>
                        <h4>
                          {item.username}
                        </h4>
                        <p className="text-muted">User since: {item.registered}</p>
                        <CButton onClick={async () => {
                          setinitialValues(item);
                          ToggleModalEdit();
                        }} size="sm" color="info">
                          Ubah Data
                        </CButton>

                        <CButton className={'ml-2'} onClick={async () => {
                            const TahunIni = moment().format('YYYY');
                            const TahunLalu = TahunIni - 1;
                            const DuaTahunLalu = TahunIni - 2;

                            const NewData = {id_user : item.id, [TahunIni] : 12, [TahunLalu] : 6, [DuaTahunLalu] : 6};
                            item.saldo_cuti.forEach(items => {
                              if(items.tahun === TahunIni.toString() || items.tahun === TahunLalu.toString() || items.tahun === DuaTahunLalu.toString()){
                                NewData[items.tahun] = items.sisa;
                              }
                            })
                            setinitialValues2(NewData)
                            ToggleModalSetStateModalSaldoCUti();
                        }} size="sm" color="success">
                          Set Saldo Awal Cuti
                        </CButton>

                        <CButton disabled={item.otoritas === 1} onClick={() => ValidasiDelete(item.id, item.block === 1 ? 'block' : 'unblock')} size="sm" color={item.block === 1 ? 'danger' : 'warning'} className="ml-1">
                          {item.block === 1 ? 'Blokir' : 'Buka Blokir'}
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                }
            }}
          />
        </CCardBody>
      </CCard>

      <ModalTambahUser Modal={Modal} ToggleModal={ToggleModal} GetData={GetData} initialValues={null}/>
      {
        initialValues !== null ?
          <React.Fragment>
            <ModalTambahUser Modal={ModalEdit} ToggleModal={ToggleModalEdit} GetData={GetData} initialValues={initialValues} setinitialValues={setinitialValues}/>
          </React.Fragment>
           : null
      }
      {
        initialValues2 !== null ?
          <React.Fragment>
            <ModalSetSaldoAwalCuti Modal={StateModalSaldoCUti} ToggleModal={ToggleModalSetStateModalSaldoCUti} GetData={GetData} initialValues={initialValues2} setinitialValues={setinitialValues2}/>
          </React.Fragment>
          : null
      }

    </>
  )
}

const UserAdmin = React.memo(UserAdminKomponent)
export default UserAdmin;
