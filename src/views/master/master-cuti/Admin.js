import React, { useState, useEffect, useContext } from 'react';
import {CBadge, CCard, CCardBody, CCardHeader, CDataTable} from "@coreui/react";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";
import {fields2 as fields, JenisCuti, StatusCuti} from "../pengajuan-cuti/helper";

const AdminKomponent = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);


  const GetData = async () => {
    setLoading(true);
    await API('get','api/pengajuan/saya', {action : "master"}, AsyncToken)
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    setLoading(false);
  }



  useEffect(() => {
    GetData();
  }, [])

  return(
    <React.Fragment>
      <CCard>
        <CCardHeader>
          Data Cuti Pegawai
          <div className='float-right'>

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
              )
            }}
          />
        </CCardBody>
      </CCard>
    </React.Fragment>
  )
}

const Admin = React.memo(AdminKomponent)
export default Admin;
