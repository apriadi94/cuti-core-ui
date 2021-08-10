import React, {useState, useEffect, useContext, useCallback} from 'react';
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CDataTable, CSelect} from "@coreui/react";
import moment from 'moment';
import swal from "sweetalert";

const Reminder = () => {
  const {AsyncToken} = useContext(GlobalContext);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Status, setStatus] = useState(1)

  const fields = [
    { key: 'tanggal', label : 'Tanggal Reminder', _style: { width: '15%'} },
    { key: 'judul', label : 'Judul', _style: { width: '15%'} },
    { key: 'keterangan', label : 'Keterangan', _style: { width: '15%'} },
    { key: 'status', label : 'Status', _style: { width: '15%'} },
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const GetData = useCallback(async () => {
    await API('get','api/reminder/', {status : Status}, AsyncToken).then(res => {
      setData(res.data.data)
    }).catch(e => {
      console.log(e)
    })
    setLoading(false)
  }, [Status])


  const ValidasiDelete = (id) => {
    swal({
      title: "Anda Yakin?",
      text: 'Data tidak akan bisa dikembalikan',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          DeleteData(id)
        } else {
          swal("Aksi dibatalkan");
        }
      });
  }

  const DeleteData = async (id) => {
    await API('delete','api/reminder/delete', {id : id}, AsyncToken).then(res => {
      GetData();
      swal("Berhasil, data berhasil dihapus", {
        icon: "success",
      });
    }).catch(e => {
      console.log(e)
    })
  }

  const StatusReminder = (status) => {
    switch (status) {
      case 1: return ['Menunggu', 'warning']
      case 2: return ['Selesai', 'success']
      default: return ['Lainnya', 'primary']
    }
  }

  useEffect(() => {
    GetData()
  }, [GetData])

  return(
    Loading ?
    <h1 className='text-center'>Loading...</h1> :
      <CCard>
        <CCardHeader>
          Data Reminder
          <div className='float-right d-flex'>
            <CSelect size='sm' name="ccmonth" id="ccmonth" onChange={(e) => setStatus(Number(e.target.value))}>
              <option value={0}>Pilih Status</option>
              <option value={1}>Menunggu</option>
              <option value={2}>Selesai</option>
            </CSelect>
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
              'tanggal' : (item) => (
                <td>
                  {moment(item.tanggal).format('dddd, DD, MMMM YYYY')}
                </td>
              ),
              'status' : (item) => (
                <td>
                  <CBadge size={'lg'} color={StatusReminder(item.status)[1]}>
                    {StatusReminder(item.status)[0]}
                  </CBadge>
                </td>
              ),
              'show_details':
                (item)=>{
                  return (
                    <td className="py-2">
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={()=>{ValidasiDelete(item.id)}}
                      >
                       Hapus
                      </CButton>
                    </td>
                  )
                },
            }}
          />
        </CCardBody>
      </CCard>
  )
}

export default Reminder;
