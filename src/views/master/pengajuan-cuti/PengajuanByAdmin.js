import React, { useState, useEffect, useContext } from 'react';
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CCollapse, CDataTable} from "@coreui/react";
import ModalPengajuanCuti from "./modal-pengajuan-cuti/ModalPengajuanCuti";
import CustomModal from "../../konfigurasi/user/c_modal";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";
import {fields, JenisCuti, StatusCuti} from "./helper";
import CustomHooks from "../../konfigurasi/user/c_detail";
import swal from 'sweetalert';

const PengajuanByAdmin = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [StateModalPengajuanCuti, ToggleModalPengajuanCuti] = CustomModal();
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [details, toggleDetails] = CustomHooks();



  const GetData = async () => {
    setLoading(true);
   await API('get','api/pengajuan/saya', {action : "pengajuan"}, AsyncToken)
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data) 
      }).catch(err => {
        console.log(err)
      })
    setLoading(false);
  }

  const ValidasiSetujui = (Id) => {
    swal({
      title: "Anda Yakin?",
      text: 'Setelah disetujui data tidak akan dapat dirubah',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          SetujuiPengajuan(Id)
        } else {
          swal("Aksi dibatalkan");
        }
      });
  }

  const SetujuiPengajuan = async (Id) => {
    const data = {status : 2, pertimbangan_atasan_langsung : '', id : Id}
    await API('post', 'api/pengajuan/setujui', data, AsyncToken)
      .then(res => {
        GetData();
      }).catch(err => {
        console.log(err)
      })
  }

  const TangguhkanPengajuan = (Id) => {
    swal("Tuliskan alasan Penangguhan!", {
      content: "input",
    })
      .then((value) => {
        if(value === null){
          swal("aksi dibatalkan")
        }else{
          const data = {status : 4, pertimbangan_atasan_langsung : value, id : Id}
          API('post', 'api/pengajuan/setujui', data, AsyncToken)
          .then(res => {
            GetData();
          }).catch(err => {
            console.log(err)
          })
        }
      });
  }

  useEffect(() => {
    GetData();
  }, [])

  return(
    <React.Fragment>
      <CCard>
        <CCardHeader>
          Data Pengajuan Pegawai
          <div className='float-right'>
            <CButton onClick={ToggleModalPengajuanCuti} size="sm" color="success">+ Ajukan Cuti</CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={Data}
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
              'jenis_cuti' : (item) => (
                <td>
                  {JenisCuti(item.jenis_cuti)}
                </td>
              ),
              'dokument' : (item) => (
                <td>
                  <a href={`${process.env.REACT_APP_BASE_URL}/api/dokument/buat?id=${item.id}`} className='btn btn-sm btn-primary' color='primary'>Download</a>
                </td>
              ),
              'status' : (item) => (
                <td>
                  <CBadge color={StatusCuti(item.status)[1]}>
                    {StatusCuti(item.status)[0]}
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
                       <h4>{item.nama}</h4>
                        <h6 className={'ml-3'}>Sisa Cuti : {item.sisa_cuti} hari</h6>
                        <h6 className={'ml-3'}>Alasan Cuti : {item.alasan_cuti}</h6>

                        <CButton disabled={item.status === 2} onClick={() => ValidasiSetujui(item.id)} className='mt-3' size="sm" color={'success'}>Setujui</CButton>
                        <CButton disabled={item.status === 4 || item.status === 2} onClick={() => TangguhkanPengajuan(item.id)} className='mt-3 ml-3' size="sm" color={'danger'}>Tangguhkan</CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                }
            }}
          />
        </CCardBody>
      </CCard>

      <ModalPengajuanCuti Modal={StateModalPengajuanCuti} ToggleModal={ToggleModalPengajuanCuti} GetData={GetData}/>
    </React.Fragment>
  )
}
export default React.memo(PengajuanByAdmin);
