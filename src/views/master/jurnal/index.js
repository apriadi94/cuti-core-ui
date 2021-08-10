import React, {useState, useEffect, useContext, useCallback} from 'react';
import {useParams} from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader, CCol,
  CDataTable, CFormGroup, CInput, CLabel,

  CModal, CModalBody, CModalFooter,
  CModalHeader, CModalTitle, CRow,
  CSelect
} from "@coreui/react";
import {API} from "../../../helper";
import moment from "moment";
import {GlobalContext} from "../../../globalState";
import YearPicker from "react-year-picker";
import CustomModal from "../../konfigurasi/user/c_modal";
import Select from 'react-select';
import swal from "sweetalert";


const Jurnal = () => {
  let { method } = useParams();
  const {AsyncToken} = useContext(GlobalContext)
  const [Data, setData] = useState([])
  const [Loading, setLoading] = useState(true);
  const [Periode, setPeriode] = useState(0)
  const [Tahun, SetTahun] = useState(moment().format('YYYY'))
  const [Modal,ToggleModal] = CustomModal();
  const [ListUserPegawai, setListUserPegawai] = useState([]);
  const [ValueUserPegawai, setValueUserPegawai] = useState([]);
  const [FormReminder, setFormReminder] = useState({
    tanggal : moment().format('DD-MM-YYYY'),
    judul : '',
    keterangan : ''
  })


  const fields = [
    { key: 'nama', label : 'Nama', _style: { width: '15%'} },
    { key: 'jabatan', label : 'Jabatan', _style: { width: '15%'} },
    { key: 'pangkat', label : 'Pangkat', _style: { width: '15%'} },
    { key: 'masa_kerja', label : 'Masa Kerja', _style: { width: '15%'} },
    { key: 'periode', label : method === 'pangkat' ? 'Periode' : 'Tanggal', _style: { width: '15%'} },
  ]

  const MasaKerja = (date) => {
    let starts = moment(date);
    let ends   = moment();
    let lama = moment.duration(ends.diff(starts));

    return `${lama.years() === 0 ? '' : lama.years() + ' tahun'} ${lama.months() === 0 ? '' : lama.months() + ' bulan'}`
  }

  const GetData = useCallback(async () => {
    await API('get','api/user/kenaikan-pangkat', {tanggalnya :Tahun}, AsyncToken)
      .then(res => {
        let NewArray = []
        let ValueUser = [];
        if(method === 'pangkat'){
          if(Periode === 1){
            NewArray = res.data.periode_1
          }else if(Periode === 2){
            NewArray = res.data.periode_2
          }else{
            const Periode1 = res.data.periode_1;
            const Periode2 = res.data.periode_2;
            NewArray = Periode1.concat(Periode2)
          }

          let NewData = [];
          NewArray.forEach(item => {
            let DataPeriodenya = '';
            if(moment(item.tanggal).format('MM') < 4 && moment(item.tanggal).format('MM') > 10){
              DataPeriodenya = 'Periode April';
            }else{
              DataPeriodenya = 'Periode Oktober';
            }

            NewData.push({
              nama : item.user.nama,
              jabatan : item.user.jabatan,
              pangkat : `${item.user.pangkat}/(${item.user.golongan})`,
              masa_kerja : MasaKerja(item.user.tmt_cpns),
              periode : DataPeriodenya
            })

            ValueUser.push({
              value: item.user.id,
              label:  item.user.nama
            })

          })
          setValueUserPegawai(ValueUser)
          setData(NewData)
        }else{
          res.data.kgb_tahun_ini.forEach(item => {
            let TanggalPeriode = moment(item.user.tmt_cpns).format('DD MMMM');
            NewArray.push({
              nama : item.user.nama,
              jabatan : item.user.jabatan,
              pangkat : `${item.user.pangkat}/(${item.user.golongan})`,
              masa_kerja : MasaKerja(item.user.tmt_cpns),
              periode : TanggalPeriode + ' ' +item.tanggal
            })
            ValueUser.push({
              value: item.user.id,
              label:  item.user.nama
            })
          })
          setValueUserPegawai(ValueUser)
          setData(NewArray)
        }

      }).catch(err => {
      console.log(err)
    })
    setLoading(false)

  }, [Periode, Tahun, method])

  const GetUserData = async () => {
    await API('get','api/user', null, AsyncToken)
      .then(res => {
        let NewData = [];
        res.data.data.forEach(item => {
          NewData.push({
            value: item.id,
            label:  item.nama
          })
        })
        setListUserPegawai(NewData)
      }).catch(err => {
        console.log(err)
      })
  }

  const TambahkanReminder =() => {
    const Data = {
      judul : FormReminder.judul,
      tanggal : moment(FormReminder.tanggal).format('YYYY-MM-DD'),
      keterangan : FormReminder.keterangan,
      list_pegawai : ValueUserPegawai,
      jenis : method === 'pangkat' ? 1 : 2
    }
    API('post','api/reminder/create', Data, AsyncToken)
      .then(res => {
        setFormReminder({
          tanggal : moment().format('DD-MM-YYYY'),
          judul : '',
          keterangan : ''
        })
        ToggleModal();
        swal("Berhasil, Reminder Berhasil Ditambah", {
          icon: "success",
        });
      }).catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    GetData()
    GetUserData();
  }, [GetData])

  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          Informasi Kenaikan {method === 'pangkat' ? 'Pangkat Pegawai' : 'Gaji Berkala Pegawai'}
          <div className='float-right d-flex'>
            {
              method === 'pangkat' ?
              <>
              <div style={{zIndex : 999}}>
                <YearPicker onChange={(date) => {
                  SetTahun(moment(`${date}-01-01`).format('YYYY-MM-DD'));
                }} />
              </div>
              <CSelect size='sm' style={{marginLeft : 5}} name="ccmonth" id="ccmonth" onChange={(e) => setPeriode(Number(e.target.value))}>
                <option value={0}>Semua Periode</option>
                <option value={1}>Periode April</option>
                <option value={2}>Periode Oktober</option>
              </CSelect>
              </> :
                <div style={{zIndex : 999}}>
                  <YearPicker onChange={(date) => {
                    SetTahun(moment(`${date}-01-01`).format('YYYY-MM-DD'));
                  }} />
                </div>
            }
            <button className='btn btn-sm btn-success ml-2' onClick={ToggleModal}>Reminder</button>
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
          />
        </CCardBody>
      </CCard>

      <div style={{zIndex : 99999}}>
        <CModal
          show={Modal}
          onClose={ToggleModal}
          closeOnBackdrop={false}
          size={'lg'}
        >
          <CModalHeader>
            <CModalTitle>Reminder/Pengingat</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>

              <CCol md="12">
                <CFormGroup>
                  <CLabel>Pegawai</CLabel>
                  <Select
                    value={ValueUserPegawai}
                    isMulti
                    options={ListUserPegawai}
                    name="colors"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                      setValueUserPegawai(e)
                    }}
                  />
                </CFormGroup>
              </CCol>

              <CCol md="12">
                <CFormGroup>
                  <CLabel>Tanggal Pengingat</CLabel>
                  <CInput value={FormReminder.tanggal} onChange={(e) => {setFormReminder({...FormReminder, tanggal : e.target.value})}} type={'date'} as={''} name={'Tanggal Pengingat'} placeholder={`Isikan Tanggal Pengingat`}/>
                </CFormGroup>
              </CCol>
              <CCol md="12">
                <CFormGroup>
                  <CLabel>Judul Pengingat</CLabel>
                  <CInput  value={FormReminder.judul} onChange={(e) => {setFormReminder({...FormReminder, judul : e.target.value})}}  type={'text'} as={''} name={'Judul Pengingat'} placeholder={`Isikan Judul Pengingat`}/>
                </CFormGroup>
              </CCol>
              <CCol md="12">
                <CFormGroup>
                  <CLabel>Keterangan Pengingat</CLabel>
                  <CInput  value={FormReminder.keterangan} onChange={(e) => {setFormReminder({...FormReminder, keterangan : e.target.value})}}  type={'text'} as={''} name={'Keterangan Pengingat'} placeholder={`Isikan Keterangan Pengingat`}/>
                </CFormGroup>
              </CCol>
            </CRow>
          </CModalBody>

          <CModalFooter>
            <CButton onClick={TambahkanReminder} type='submit' color="primary">Tambahkan</CButton>{' '}
            <CButton
              color="secondary"
              onClick={ToggleModal}
            >Cancel</CButton>
          </CModalFooter>

        </CModal>
      </div>


    </React.Fragment>
  )
}

export default Jurnal
